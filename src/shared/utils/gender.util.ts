export class GenderUtil {
    public static getLabel(gender?: string): string {
        switch (gender) {
            case 'M':
                return 'Masculino';
            case 'F':
                return 'Feminino';
            default:
                return 'Não declarado';
        }
    }
}
