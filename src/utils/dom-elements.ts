import { getElement } from './dom-selectors';

// Element references
export const menu = {
    results: getElement<HTMLDivElement>('results'),
    browserInfo: getElement<HTMLDivElement>('browserInfo'),
    osInfo: getElement<HTMLDivElement>('osInfo'),
    userAgentInfo: getElement<HTMLDivElement>('userAgentInfo'),
    startButton: getElement<HTMLButtonElement>('startButton'),
    exportButton: getElement<HTMLButtonElement>('exportButton'),
    exportContainer: getElement<HTMLDivElement>('exportContainer'),
    progressContainer: getElement<HTMLDivElement>('progress'),
    spinner: getElement<HTMLDivElement>('testSpinner'),
    uploadForm: getElement<HTMLDivElement>('uploadForm'),
    fileInput: getElement<HTMLInputElement>('fileInput'),
    loadButton: getElement<HTMLButtonElement>('loadButton'),
    sysinfoheader: getElement<HTMLTableCellElement>('sysInfoHeader'),
    testresultsheader: getElement<HTMLTableCellElement>('testResultsHeader')
};

export const progressBar = {
    sTimeout: getElement<HTMLDivElement>('shortTimeoutProgress'),
    sInterval: getElement<HTMLDivElement>('shortIntervalProgress'),
    lTimeout: getElement<HTMLDivElement>('longTimeoutProgress'),
    lInterval: getElement<HTMLDivElement>('longIntervalProgress')
};

export const shortTimeout = {
    avg: getElement<HTMLTableCellElement>('shortTimeoutAvg'),
    min: getElement<HTMLTableCellElement>('shortTimeoutMin'),
    max: getElement<HTMLTableCellElement>('shortTimeoutMax'),
    stdDev: getElement<HTMLTableCellElement>('shortTimeoutStdDev')
};

export const shortInterval = {
    avg: getElement<HTMLTableCellElement>('shortIntervalAvg'),
    min: getElement<HTMLTableCellElement>('shortIntervalMin'),
    max: getElement<HTMLTableCellElement>('shortIntervalMax'),
    stdDev: getElement<HTMLTableCellElement>('shortIntervalStdDev')
};

export const longTimeout = {
    avg: getElement<HTMLTableCellElement>('longTimeoutAvg'),
    min: getElement<HTMLTableCellElement>('longTimeoutMin'),
    max: getElement<HTMLTableCellElement>('longTimeoutMax'),
    stdDev: getElement<HTMLTableCellElement>('longTimeoutStdDev')
};

export const longInterval = {
    avg: getElement<HTMLTableCellElement>('longIntervalAvg'),
    min: getElement<HTMLTableCellElement>('longIntervalMin'),
    max: getElement<HTMLTableCellElement>('longIntervalMax'),
    stdDev: getElement<HTMLTableCellElement>('longIntervalStdDev')
};