import { SystemInfo } from './types';
import Bowser from 'bowser';

export function getSystemInfo(): SystemInfo {
    const parser = Bowser.getParser(window.navigator.userAgent);
    const browserInfo = parser.getBrowser();
    const osInfo = parser.getOS();
    const platformInfo = parser.getPlatform();

    return {
        userAgent: window.navigator.userAgent,
        platform: platformInfo.type || 'Unknown',
        platformVendor: platformInfo.vendor || undefined,
        platformModel: platformInfo.model || undefined,
        browser: browserInfo.name || 'Unknown',
        version: browserInfo.version || 'Unknown',
        os: osInfo.name || 'Unknown'
    };    
}
