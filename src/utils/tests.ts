import { TestResults, TestConfig } from './types';
import { progressBar } from './dom-elements';
import { updateProgress } from './dom-utils';

export const testConfig: TestConfig = {
    shortTimeoutDuration: 50,
    shortTimeoutTrials: 100,
    shortIntervalDuration: 50,
    shortIntervalCycles: 100,
    longTimeoutDuration: 10000,
    longTimeoutTrials: 5,
    longIntervalDuration: 10000,
    longIntervalCycles: 5
};

export const testResults: TestResults = {
    shortTimeouts: [],
    shortIntervals: [],
    longTimeouts: [],
    longIntervals: []
};

export function runShortTimeoutTest(): Promise<void> {
    return new Promise<void>((resolve) => {
        let completedTrials = 0;
        testResults.shortTimeouts = [];
        
        function runTrial(): void {
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
                    resolve();
                }
            }, testConfig.shortTimeoutDuration);
        }
        
        runTrial();
    });
}

export function runShortIntervalTest(): Promise<void> {
    return new Promise<void>((resolve) => {
        let completedCycles = 0;
        testResults.shortIntervals = [];
        
        let lastIntervalTime = performance.now();
        
        const interval = setInterval(() => {
            const currentTime = performance.now();
            
            if (completedCycles > 0) {
                const actualInterval = currentTime - lastIntervalTime;
                const drift = actualInterval - testConfig.shortIntervalDuration;
                
                testResults.shortIntervals.push({
                    cycle: completedCycles,
                    expected: testConfig.shortIntervalDuration,
                    actual: actualInterval,
                    drift: drift
                });
            }
            
            lastIntervalTime = currentTime;
            
            completedCycles++;
            updateProgress(progressBar.sInterval, completedCycles, testConfig.shortIntervalCycles);
            
            if (completedCycles >= testConfig.shortIntervalCycles) {
                clearInterval(interval);
                resolve();
            }
        }, testConfig.shortIntervalDuration);
    });
}

// Run long timeout test
export function runLongTimeoutTest(): Promise<void> {
    return new Promise<void>((resolve) => {
        let completedTrials = 0;
        testResults.longTimeouts = [];
        
        function runTrial(): void {
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
                    resolve();
                }
            }, testConfig.longTimeoutDuration);
        }
        
        runTrial();
    });
}

export function runLongIntervalTest(): Promise<void> {
    return new Promise<void>((resolve) => {
        let completedCycles = 0;
        testResults.longIntervals = [];
        
        // Record the start time
        let lastIntervalTime = performance.now();
        
        const interval = setInterval(() => {
            const currentTime = performance.now();
            
            if (completedCycles > 0) {
                const actualInterval = currentTime - lastIntervalTime;
                const drift = actualInterval - testConfig.longIntervalDuration;
                
                testResults.longIntervals.push({
                    cycle: completedCycles,
                    expected: testConfig.longIntervalDuration,
                    actual: actualInterval,
                    drift: drift
                });
            }
            
            lastIntervalTime = currentTime;
            
            completedCycles++;
            updateProgress(progressBar.lInterval, completedCycles, testConfig.longIntervalCycles);
            
            if (completedCycles >= testConfig.longIntervalCycles) {
                clearInterval(interval);
                resolve();
            }
        }, testConfig.longIntervalDuration);
    });
}
