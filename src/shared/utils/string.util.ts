export class StringUtil {
    public static convertArrayToText(arr: string[]): string {
        let errorFormatted: string = '';
        arr.forEach((err: string) => {
            errorFormatted += err + ', ';
        });
        return errorFormatted.substring(0, errorFormatted.length - 2);
    }

    public static validateEmail(email: string): boolean {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
            ? true
            : false;
    }
}