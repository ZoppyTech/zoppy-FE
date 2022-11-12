export class FileUtils {
    public static downloadBlob(fileName: string, blob: Blob) {
        const link: any = document.createElement('a');

        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.style.display = 'none';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
    }
}
