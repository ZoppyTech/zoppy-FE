export class MatrixRFMResponse {
    public declare phone: string;
    public declare recency: Grade;
    public declare frequency: Grade;
    public declare amount: Grade;
    public declare position: Position;
}

export type Grade = 1 | 2 | 3 | 4 | 5;
export type Position =
    | 'cant-lose'
    | 'at-risk'
    | 'loyal'
    | 'champion'
    | 'need-attention'
    | 'possible-loyal'
    | 'sleeping'
    | 'almost-sleeping'
    | 'promising'
    | 'new'
    | 'all';
