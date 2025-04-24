// Browser Timer Test - Timer accuracy measurement tool
// Element references
const menu = {
    results: document.getElementById('results'),
    browserInfo: document.getElementById('browserInfo'),
    osInfo: document.getElementById('osInfo'),
    userAgentInfo: document.getElementById('userAgentInfo'),
    startButton: document.getElementById('startButton'),
    exportButton: document.getElementById('exportButton'),
    progressContainer: document.getElementById('progress'),
    spinner: document.getElementById('testSpinner')
}

const progressBar = {
    sTimeout: document.getElementById('shortTimeoutProgress'),
    sInterval: document.getElementById('shortIntervalProgress'),
    lTimeout: document.getElementById('longTimeoutProgress'),
    lInterval: document.getElementById('longIntervalProgress')
}

const shortTimeout = {
    avg: document.getElementById('shortTimeoutAvg'),
    min: document.getElementById('shortTimeoutMin'),
    max: document.getElementById('shortTimeoutMax'),
    stdDev: document.getElementById('shortTimeoutStdDev')
}

const shortInterval = {
    avg: document.getElementById('shortIntervalAvg'),
    min: document.getElementById('shortIntervalMin'),
    max: document.getElementById('shortIntervalMax'),
    stdDev: document.getElementById('shortIntervalStdDev')
}

const longTimeout = {
    avg: document.getElementById('longTimeoutAvg'),
    min: document.getElementById('longTimeoutMin'),
    max: document.getElementById('longTimeoutMax'),
    stdDev: document.getElementById('longTimeoutStdDev')
}

const longInterval = {
    avg: document.getElementById('longIntervalAvg'),
    min: document.getElementById('longIntervalMin'),
    max: document.getElementById('longIntervalMax'),
    stdDev: document.getElementById('longIntervalStdDev')
}

// System and browser detection
function getSystemInfo() {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const browserInfo = {
        userAgent,
        platform,
        browser: 'Unknown',
        version: 'Unknown',
        os: 'Unknown'
    };

    // Detect browser
    if (userAgent.indexOf('Firefox') > -1) {
        browserInfo.browser = 'Firefox';
    } else if (userAgent.indexOf('SamsungBrowser') > -1) {
        browserInfo.browser = 'Samsung Browser';
    } else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
        browserInfo.browser = 'Opera';
    } else if (userAgent.indexOf('Edg') > -1) {
        browserInfo.browser = 'Edge';
    } else if (userAgent.indexOf('Chrome') > -1) {
        browserInfo.browser = 'Chrome';
    } else if (userAgent.indexOf('Safari') > -1) {
        browserInfo.browser = 'Safari';
    }

    // Detect OS
    if (platform.indexOf('Win') > -1) {
        browserInfo.os = 'Windows';
    } else if (platform.indexOf('Mac') > -1) {
        browserInfo.os = 'MacOS';
    } else if (platform.indexOf('Linux') > -1) {
        browserInfo.os = 'Linux';
    } else if (platform.indexOf('iPhone') > -1 || platform.indexOf('iPad') > -1 || platform.indexOf('iPod') > -1) {
        browserInfo.os = 'iOS';
    } else if (userAgent.indexOf('Android') > -1) {
        browserInfo.os = 'Android';
    }

    return browserInfo;
}

// Test data storage
const testResults = {
    shortTimeouts: [],
    shortIntervals: [],
    longTimeouts: [],
    longIntervals: []
};

// Test configurations
const testConfig = {
    shortTimeoutDuration: 50, // ms
    shortTimeoutTrials: 100,
    shortIntervalDuration: 50, // ms
    shortIntervalCycles: 100,
    longTimeoutDuration: 10000, // ms (10 seconds)
    longTimeoutTrials: 5,
    longIntervalDuration: 10000, // ms (10 seconds)
    longIntervalCycles: 5
};

// Run short timeout test
function runShortTimeoutTest(callback) {
    let completedTrials = 0;
    testResults.shortTimeouts = [];
    
    function runTrial() {
        const startTime = performance.now();
        setTimeout(() => {
            const endTime = performance.now();
            const actualDuration = endTime - startTime;
            const drift = actualDuration - testConfig.shortTimeoutDuration;
            
            testResults.shortTimeouts.push({
                expected: testConfig.shortTimeoutDuration,
                actual: actualDuration,
                drift: drift
            });
            
            completedTrials++;
            updateProgress(progressBar.sTimeout, completedTrials, testConfig.shortTimeoutTrials);
            
            if (completedTrials < testConfig.shortTimeoutTrials) {
                runTrial();
            } else {
                callback();
            }
        }, testConfig.shortTimeoutDuration);
    }
    
    runTrial();
}

function runShortIntervalTest(callback) {
    let completedCycles = 0;
    testResults.shortIntervals = [];
    
    // Record the start time
    let lastIntervalTime = performance.now();
    
    const interval = setInterval(() => {
        const currentTime = performance.now();
        
        // Only record drift after the first cycle (to avoid initialization overhead)
        if (completedCycles > 0) {
            // Calculate drift based on the time since the last interval execution
            // rather than an absolute expected time
            const actualInterval = currentTime - lastIntervalTime;
            const drift = actualInterval - testConfig.shortIntervalDuration;
            
            testResults.shortIntervals.push({
                cycle: completedCycles,
                expected: testConfig.shortIntervalDuration,
                actual: actualInterval,
                drift: drift
            });
        }
        
        // Update the last interval time for the next cycle
        lastIntervalTime = currentTime;
        
        // Update progress and check completion
        completedCycles++;
        updateProgress(progressBar.sInterval, completedCycles, testConfig.shortIntervalCycles);
        
        if (completedCycles >= testConfig.shortIntervalCycles) {
            clearInterval(interval);
            callback();
        }
    }, testConfig.shortIntervalDuration);
}

// Run long timeout test
function runLongTimeoutTest(callback) {
    let completedTrials = 0;
    testResults.longTimeouts = [];
    
    function runTrial() {
        const startTime = performance.now();
        setTimeout(() => {
            const endTime = performance.now();
            const actualDuration = endTime - startTime;
            const drift = actualDuration - testConfig.longTimeoutDuration;
            
            testResults.longTimeouts.push({
                expected: testConfig.longTimeoutDuration,
                actual: actualDuration,
                drift: drift
            });
            
            completedTrials++;
            updateProgress(progressBar.lTimeout, completedTrials, testConfig.longTimeoutTrials);
            
            if (completedTrials < testConfig.longTimeoutTrials) {
                runTrial();
            } else {
                callback();
            }
        }, testConfig.longTimeoutDuration);
    }
    
    runTrial();
}

function runLongIntervalTest(callback) {
    let completedCycles = 0;
    testResults.longIntervals = [];
    
    // Record the start time
    let lastIntervalTime = performance.now();
    
    const interval = setInterval(() => {
        const currentTime = performance.now();
        
        // Only record drift after the first cycle
        if (completedCycles > 0) {
            // Calculate drift based on the time since the last interval execution
            const actualInterval = currentTime - lastIntervalTime;
            const drift = actualInterval - testConfig.longIntervalDuration;
            
            testResults.longIntervals.push({
                cycle: completedCycles,
                expected: testConfig.longIntervalDuration,
                actual: actualInterval,
                drift: drift
            });
        }
        
        // Update the last interval time for the next cycle
        lastIntervalTime = currentTime;
        
        // Update progress and check completion
        completedCycles++;
        updateProgress(progressBar.lInterval, completedCycles, testConfig.longIntervalCycles);
        
        if (completedCycles >= testConfig.longIntervalCycles) {
            clearInterval(interval);
            callback();
        }
    }, testConfig.longIntervalDuration);
}

// Update progress bar
function updateProgress(element, current, total) {
    const percentage = Math.round((current / total) * 100);
    element.style.width = percentage + '%';
    element.textContent = percentage + '%';
    element.setAttribute('aria-valuenow', percentage);
    
    // Change style if 100%
    if (percentage === 100) {
        element.classList.add('bg-success');
        element.classList.remove('progress-bar-animated');
    }
}

// Calculate statistics
function calculateStats(data) {
    if (data.length === 0) return { avg: 0, min: 0, max: 0, stdDev: 0 };
    
    const drifts = data.map(item => item.drift);
    const sum = drifts.reduce((a, b) => a + b, 0);
    const avg = sum / drifts.length;
    const min = Math.min(...drifts);
    const max = Math.max(...drifts);
    
    // Calculate standard deviation
    const squareDiffs = drifts.map(value => {
        const diff = value - avg;
        return diff * diff;
    });
    const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / drifts.length;
    const stdDev = Math.sqrt(avgSquareDiff);
    
    return {
        avg: avg,
        min: min,
        max: max,
        stdDev: stdDev
    };
}

// Display results
function displayResults() {
    menu.spinner.classList.replace('d-inline-block', 'd-none');
    const shortTimeoutStats = calculateStats(testResults.shortTimeouts);
    const shortIntervalStats = calculateStats(testResults.shortIntervals);
    const longTimeoutStats = calculateStats(testResults.longTimeouts);
    const longIntervalStats = calculateStats(testResults.longIntervals);
    
    shortTimeout.avg.textContent = shortTimeoutStats.avg.toFixed(2) + ' ms';
    shortTimeout.min.textContent = shortTimeoutStats.min.toFixed(2) + ' ms';
    shortTimeout.max.textContent = shortTimeoutStats.max.toFixed(2) + ' ms';
    shortTimeout.stdDev.textContent = shortTimeoutStats.stdDev.toFixed(2) + ' ms';
    
    shortInterval.avg.textContent = shortIntervalStats.avg.toFixed(2) + ' ms';
    shortInterval.min.textContent = shortIntervalStats.min.toFixed(2) + ' ms';
    shortInterval.max.textContent = shortIntervalStats.max.toFixed(2) + ' ms';
    shortInterval.stdDev.textContent = shortIntervalStats.stdDev.toFixed(2) + ' ms';
    
    longTimeout.avg.textContent = longTimeoutStats.avg.toFixed(2) + ' ms';
    longTimeout.min.textContent = longTimeoutStats.min.toFixed(2) + ' ms';
    longTimeout.max.textContent = longTimeoutStats.max.toFixed(2) + ' ms';
    longTimeout.stdDev.textContent = longTimeoutStats.stdDev.toFixed(2) + ' ms';
    
    longInterval.avg.textContent = longIntervalStats.avg.toFixed(2) + ' ms';
    longInterval.min.textContent = longIntervalStats.min.toFixed(2) + ' ms';
    longInterval.max.textContent = longIntervalStats.max.toFixed(2) + ' ms';
    longInterval.stdDev.textContent = longIntervalStats.stdDev.toFixed(2) + ' ms';
    
    // Show results section
    menu.results.classList.remove('d-none');
}

// Export data as JSON
function exportData() {
    const dataStr = JSON.stringify(testResults, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'timer-test-results.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Start all tests
function startTests() {
    // Display system info
    const systemInfo = getSystemInfo();
    menu.browserInfo.textContent = systemInfo.browser;
    menu.osInfo.textContent = systemInfo.os;
    menu.userAgentInfo.textContent = systemInfo.userAgent;
    
    // Set visibility
    menu.startButton.classList.add('d-none');
    menu.progressContainer.classList.remove('d-none');
    menu.spinner.classList.replace('d-none', 'd-inline-block');

    // Run tests in sequence
    runShortTimeoutTest(() => {
        runShortIntervalTest(() => {
            runLongTimeoutTest(() => {
                runLongIntervalTest(() => {
                    displayResults();
                });
            });
        });
    });
}

// Initialize listeners
menu.startButton.addEventListener('click', startTests);
menu.exportButton.addEventListener('click', exportData);
