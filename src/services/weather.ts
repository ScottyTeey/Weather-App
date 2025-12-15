import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment.development';

// Interfaces for type safety
export interface WeatherLocation {
  name: string;
  country: string;
  region: string;
  lat: string;
  lon: string;
  timezone_id: string;
  localtime: string;
}

export interface WeatherCurrent {
  temperature: number;
  weather_descriptions: string[];
  weather_icons: string[];
  humidity: number;
  wind_speed: number;
  wind_dir: string;
  pressure: number;
  cloudcover: number;
  feelslike: number;
  visibility: number;
  uv_index: number;
  is_day: string;
}

export interface WeatherResponse {
  request: {
    type: string;
    query: string;
    language: string;
    unit: string;
  };
  location: WeatherLocation;
  current: WeatherCurrent;
}

export interface WeatherError {
  success: false;
  error: {
    code: number;
    type: string;
    info: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly apiUrl = environment.weatherstackApiUrl;
  private readonly accessKey = environment.weatherstackApiKey;

  constructor(private http: HttpClient) {}

  /**
   * Fetches current weather data for a given location
   * @param location - City name or coordinates
   * @returns Observable of WeatherResponse
   */
  getCurrentWeather(location: string): Observable<WeatherResponse> {
    const params = new HttpParams()
      .set('query', location)
      .set('access_key', this.accessKey);

    return this.http.get<WeatherResponse>(this.apiUrl, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Handles HTTP errors
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else if (error.status === 0) {
      // Network error
      errorMessage = 'Unable to connect to the weather service. Please check your internet connection.';
    } else {
      // Server-side error
      errorMessage = `Server Error: ${error.status} - ${error.message}`;
    }

    console.error('WeatherService Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
