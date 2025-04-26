import { Stats, TestResult } from './types';

export function updateProgress(element: HTMLElement, current: number, total: number): void {
    const percentage = Math.round((current / total) * 100);
    element.style.width = percentage + '%';
    element.textContent = percentage + '%';
    element.setAttribute('aria-valuenow', percentage.toString());

    if (percentage === 100) {
        element.classList.add('bg-success');
        element.classList.remove('progress-bar-animated');
    }
}

export function calculateStats(data: TestResult[]): Stats {
    if (data.length === 0) return { avg: 0, min: 0, max: 0, stdDev: 0 };

    const drifts = data.map(item => item.drift);
    const sum = drifts.reduce((a, b) => a + b, 0);
    const avg = sum / drifts.length;
    const min = Math.min(...drifts);
    const max = Math.max(...drifts);

    const squareDiffs = drifts.map(value => {
        const diff = value - avg;
        return diff * diff;
    });
    
    const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / drifts.length;
    const stdDev = Math.sqrt(avgSquareDiff);

    return { avg, min, max, stdDev };
}
