import { menu } from './utils/dom-elements';
import { getSystemInfo } from './utils/system-info';
import { runShortTimeoutTest, runShortIntervalTest, runLongTimeoutTest, runLongIntervalTest } from './utils/tests';
import { displayResults, exportData } from './utils/ui';
import { initFileHandlers } from './utils/file-handler';
import { Tooltip } from 'bootstrap';

// Start all tests
async function startTests(): Promise<void> {
    // Display system info
    const systemInfo = getSystemInfo();
    menu.browserInfo.textContent = systemInfo.browser;
    menu.osInfo.textContent = systemInfo.os;
    menu.userAgentInfo.textContent = systemInfo.userAgent;
    
    // Set visibility
    menu.startButton.classList.add('d-none');
    menu.uploadForm.classList.add('d-none');
    menu.progressContainer.classList.remove('d-none');
    menu.spinner.classList.replace('d-none', 'd-inline-block');

    try {
        await runShortTimeoutTest();
        await runShortIntervalTest();
        await runLongTimeoutTest();
        await runLongIntervalTest();
        
        displayResults();
    } catch (error) {
        console.error('Error running tests:', error);
        // Handle error appropriately
    }
}

export function init(): void {
    // Initialize listeners
    menu.startButton.addEventListener('click', startTests);
    menu.exportButton.addEventListener('click', exportData);
    
    // Initialize file upload handlers
    initFileHandlers();

    // Initialize tooltips
    const tooltipTriggerList = (document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipTriggerElArray = Array.from(tooltipTriggerList);
    const tooltipList = tooltipTriggerElArray.map(tooltipTriggerEl => {
        return new Tooltip(tooltipTriggerEl); 
    });
}
