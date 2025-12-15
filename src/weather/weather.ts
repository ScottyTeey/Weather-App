import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { WeatherService, WeatherResponse } from '../services/weather';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './weather.html',
  styleUrl: './weather.css',
})
export class Weather implements OnInit, OnDestroy {
    // State properties
    weatherData: WeatherResponse | null = null;
    isLoading = false;
    errorMessage: string | null = null;
    searchQuery = 'New Delhi';

    // Search subject for debouncing
    private searchSubject = new Subject<string>();
    private destroy$ = new Subject<void>();

    constructor(private weatherService: WeatherService) { }

    ngOnInit(): void {
        // Set up debounced search
        this.searchSubject.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            takeUntil(this.destroy$)
        ).subscribe(query => {
            this.fetchWeather(query);
        });

        // Fetch initial weather data
        this.fetchWeather(this.searchQuery);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    /**
     * Handles search input changes
     */
    onSearchChange(query: string): void {
        this.searchQuery = query;
        this.searchSubject.next(query);
    }

    /**
     * Handles form submission
     */
    onSearch(): void {
        if (this.searchQuery.trim()) {
            this.fetchWeather(this.searchQuery);
        }
    }

    /**
     * Fetches weather data from the API
     */
    private fetchWeather(location: string): void {
        if (!location.trim()) {
            this.errorMessage = 'Please enter a location';
            return;
        }

        this.isLoading = true;
        this.errorMessage = null;

        this.weatherService.getCurrentWeather(location)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (response) => {
                    // Check for API-level errors (Weatherstack returns 200 with error object)
                    if ((response as any).success === false) {
                        const apiError = response as any;
                        this.errorMessage = apiError.error?.info || 'Failed to fetch weather data';
                        this.weatherData = null;
                    } else {
                        this.weatherData = response;
                        this.errorMessage = null;
                    }
                    this.isLoading = false;
                },
                error: (error) => {
                    this.errorMessage = error.message || 'Failed to fetch weather data';
                    this.weatherData = null;
                    this.isLoading = false;
                }
            });
    }

    /**
     * Refreshes current weather data
     */
    refreshWeather(): void {
        this.fetchWeather(this.searchQuery);
    }
}
