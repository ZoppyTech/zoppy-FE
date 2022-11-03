export class ArrayUtil {
    public static toString(values: Array<string>): string {
        let response: string = '';
        values.forEach((value: string) => {
            response += value + ', ';
        });

        return response.substring(0, response.length - 2);
    }
}
