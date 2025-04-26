import { menu, shortTimeout, shortInterval, longTimeout, longInterval } from './dom-elements';
import { testResults } from './tests';
import { calculateStats } from './dom-utils';
import { getSystemInfo } from './system-info';

export function displayResults(): void {
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

export function exportData(): void {
    const systemInfo = getSystemInfo();
    
    // Combine system information and test results
    const exportData = {
        systemInfo: systemInfo,
        testResults: testResults,
        exportDate: new Date().toISOString()
    };
    
    // Stringify the combined data
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
    // Set default file name
    const currentTime = Math.floor(Date.now() / 1000);
    const exportFileDefaultName = `timer-results-${currentTime}.json`;
  
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}
