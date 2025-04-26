export interface TestResult {
    expected: number;
    actual: number;
    drift: number;
    cycle?: number;
}
  
export interface TestResults {
    shortTimeouts: TestResult[];
    shortIntervals: TestResult[];
    longTimeouts: TestResult[];
    longIntervals: TestResult[];
}
  
export interface TestConfig {
    shortTimeoutDuration: number;
    shortTimeoutTrials: number;
    shortIntervalDuration: number;
    shortIntervalCycles: number;
    longTimeoutDuration: number;
    longTimeoutTrials: number;
    longIntervalDuration: number;
    longIntervalCycles: number;
}
  
export interface Stats {
    avg: number;
    min: number;
    max: number;
    stdDev: number;
}
  
export interface SystemInfo {
    userAgent: string;
    platform: string;
    platformVendor?: string;
    platformModel?: string;
    browser: string;
    version: string;
    os: string;
}
  