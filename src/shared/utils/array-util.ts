export class ArrayUtil {
    public static toString(values: Array<string>): string {
        let response: string = '';
        values.forEach((value: string) => {
            response += value + ', ';
        });

        return response.substring(0, response.length - 2);
    }

    public static sumProperty(array: Array<any>, property: string) {
        let sum: number = 0;
        array.forEach((element: any) => {
            sum += element[property];
        });
    }
}
