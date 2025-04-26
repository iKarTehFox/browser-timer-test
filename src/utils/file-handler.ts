import { TestResults, SystemInfo } from './types';
import { menu } from './dom-elements';
import { displayResults } from './ui';
import { testResults } from './tests';

interface UploadedData {
    systemInfo: SystemInfo;
    testResults: TestResults;
    exportDate: string;
}

export function handleFileUpload(event: Event): void {
    event.preventDefault();
    
    const fileInput = menu.fileInput;
    if (!fileInput.files || fileInput.files.length === 0) {
        alert('Please select a file to upload');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
            if (e.target && typeof e.target.result === 'string') {
                const uploadedData = JSON.parse(e.target.result) as UploadedData;
                
                // Validate the uploaded data structure
                if (!uploadedData.systemInfo || !uploadedData.testResults) {
                    throw new Error('Invalid file format: Missing required data');
                }
                
                // Update system info
                menu.sysinfoheader.textContent = 'System Information (Imported)';
                menu.testresultsheader.textContent = 'Test Results (Imported)';
                menu.browserInfo.textContent = uploadedData.systemInfo.browser || 'Unknown';
                menu.osInfo.textContent = uploadedData.systemInfo.os || 'Unknown';
                menu.userAgentInfo.textContent = uploadedData.systemInfo.userAgent || 'Unknown';
                
                // Update test results
                Object.assign(testResults, uploadedData.testResults);
                
                // Display results
                displayResults();
                
                // Disable start button and upload form
                menu.startButton.disabled = true;
                menu.loadButton.disabled = true;
                menu.fileInput.disabled = true;
                menu.exportContainer.classList.add('d-none');
                
                // Add a note about loaded data
                const loadTime = new Date(uploadedData.exportDate || Date.now()).toLocaleString();
                const noteElement = document.createElement('div');
                noteElement.className = 'alert alert-info mt-3';
                noteElement.innerHTML = `<strong>Loaded data:</strong> Results from ${loadTime}`;
                menu.uploadForm.appendChild(noteElement);
            }
        } catch (error) {
            console.error('Error parsing uploaded file:', error);
            alert('Error loading file. Please make sure you are uploading a valid test results file.');
        }
    };

    reader.onerror = () => {
        alert('Error reading the file');
    };

    reader.readAsText(file);
}

export function initFileHandlers(): void {
    menu.loadButton.addEventListener('click', handleFileUpload);
}