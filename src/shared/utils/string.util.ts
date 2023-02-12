export class StringUtil {
    public static readonly SPACE: string = ' ';

    public static buildFullName(firstName: string, lastName?: string): string {
        const fullName: string = firstName + StringUtil.SPACE + (lastName ?? '');
        return fullName.trimEnd();
    }

    public static convertArrayToText(arr: string[]): string {
        return arr.join(', ');
    }

    public static onlyNumbers(text: string): string {
        try {
            return text.match(/\d+/g)?.join('') ?? '';
        } catch (exp) {
            return '';
        }
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
