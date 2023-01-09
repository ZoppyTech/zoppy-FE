export class OsUtil {
    public static getMobileOperatingSystem(): string {
        const userAgent: any = navigator.userAgent || navigator.vendor || (window as any).opera;

        if (/windows phone/i.test(userAgent)) return 'Windows Phone';
        if (/android/i.test(userAgent)) return 'Android';
        if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) return 'iOS';

        return 'unknown';
    }
}
