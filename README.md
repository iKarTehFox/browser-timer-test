# Browser Timer Test

A tool for measuring the accuracy and reliability of JavaScript timers (setTimeout and setInterval) across different browsers.

## Overview

Browser Timer Test provides (hopefully) detailed measurements of how accurately browsers implement JavaScript timing functions. It runs a series of tests with both short (50ms) and long (10s) durations using both setTimeout and setInterval, then provides statistical analysis of the results.

## Features

- Tests both setTimeout and setInterval
- Measures short (50ms) and long (10s) duration timers
- Provides statistical analysis (average, min, max, standard deviation)
- Shows real-time progress of tests
- Detects browser and operating system information
- Exports raw test data as JSON

## How to run
Clone the repository and open the `browser-timer-test` directory.
Ensure you have Node.js installed.

1. Run `npm install` to install dependencies
2. Run `npm run start` to serve the website on port 8080.
3. Open your browser and go to `http://localhost:8080`

You can also export the raw data as JSON by clicking the "Export Raw Data" button.

## Test Details

- **Short Timeout Test**: 100 trials of 50ms timeouts
- **Short Interval Test**: 100 cycles of 50ms intervals
- **Long Timeout Test**: 5 trials of 10-second timeouts
- **Long Interval Test**: 5 cycles of 10-second intervals

## Understanding the Results

- **Drift**: The difference between expected and actual time (in milliseconds)
- **Positive drift**: Timer fired later than expected
- **Negative drift**: Timer fired earlier than expected
- **Higher standard deviation**: Less consistent timing

## Why This Matters

JavaScript timers are not guaranteed to be precise. Browsers implement them differently, and factors like system load, background tabs, and power-saving features can affect their accuracy. Understanding these limitations is crucial when building time-sensitive web applications.

# Acknowledgements (OSS)
- **Bootstrap** ([Link](https://getbootstrap.com/)): Licensed under MIT License
  - Copyright (c) 2011-2025 The Bootstrap Authors
- **Material Design Icons by Pictogrammers** ([GitHub](https://github.com/Templarian/MaterialDesign)): Icons licensed under Apache License 2.0
- **ts-pattern** ([Link](https://www.npmjs.com/package/ts-pattern)): Licensed under MIT License
  - Copyright (c) 2021 Gabriel Vergnaud
- **Webpack** ([Link](https://webpack.js.org/)): Licensed under MIT License
  - Copyright JS Foundation and other contributors  

Copyright (c) 2025 Diego Perez (iKarTehFox)
