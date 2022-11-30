export class MatrixRfmUtil {
    public static getLabel(state: string): string {
        switch (state) {
            case 'cant-lose':
                return 'Não pode perder';
            case 'at-risk':
                return 'Em risco';
            case 'loyal':
                return 'Leal';
            case 'champion':
                return 'Campeão';
            case 'need-attention':
                return 'Precisa de atenção';
            case 'possible-loyal':
                return 'Possível leal';
            case 'sleeping':
                return 'Hibernando';
            case 'almost-sleeping':
                return 'Quase hibernando';
            case 'promising':
                return 'Promissor';
            case 'new':
                return 'Novo';
            default:
                return '';
        }
    }
}
