# WeatherApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.0.

## Development server

To start a local development server, run:

```bash
npm install

ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Weatherstack
<b>Quick Start Guide</b> <br>
Step 1: Your API Access Key <br>
To get started quickly, you need to fork the MarketStack Postman Collection. Simply click the button below to fork it.




<b>Step 2: Get your API Access Key</b> <br>
Go to the [Weatherstack](https://weatherstack.com) website and choose the right subscription plan for your particular project.
Get your personal API Access Key on the Dashboard to authenticate with the API. Keep it safe! You can reset it at any time in your Account Dashboard.

<b>Step 3: Make your first API call</b> <br>
Weatherstack Postman collection contains all the endpoints supported by Weatherstack API.
Current weather data
Historical weather data
Weather forecast
Autocomplete/Location lookup


## This implementation includes:

✅ Type-safe interfaces for API responses <br>
✅ Angular service with HttpClient and proper error handling <br>
✅ Loading states with spinner animation <br>
✅ Error handling with retry functionality <br>
✅ Debounced search to prevent excessive API calls <br>
✅ Responsive design with modern styling <br>
✅ Observable patterns with proper cleanup (takeUntil) <br>
✅ All weather data displayed: temperature, location, description, humidity, wind speed, and more

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page and Weatherstack public api: [weatherstackapi](https://weatherstack.com/documentation)
