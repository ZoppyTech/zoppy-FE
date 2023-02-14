import { MatrixRfmConstants } from '@ZoppyTech/utilities';

export class MatrixRfmUtil {
    public static getLabel(state: string): string {
        switch (state) {
            case MatrixRfmConstants.STATE.CANT_LOSE:
                return 'Não pode perder';
            case MatrixRfmConstants.STATE.AT_RISK:
                return 'Em risco';
            case MatrixRfmConstants.STATE.LOYAL:
                return 'Leal';
            case MatrixRfmConstants.STATE.CHAMPION:
                return 'Campeão';
            case MatrixRfmConstants.STATE.NEED_ATTENTION:
                return 'Precisa de atenção';
            case MatrixRfmConstants.STATE.POSSIBLE_LOYAL:
                return 'Possível leal';
            case MatrixRfmConstants.STATE.SLEEPING:
                return 'Hibernando';
            case MatrixRfmConstants.STATE.ALMOST_SLEEPING:
                return 'Quase hibernando';
            case MatrixRfmConstants.STATE.PROMISING:
                return 'Promissor';
            case MatrixRfmConstants.STATE.NEW:
                return 'Novo';
            default:
                return '';
        }
    }
}
