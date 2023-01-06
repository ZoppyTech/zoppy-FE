export class AbcResponse {
    public declare products: AbcEntityResponse[];
    public declare categories: AbcEntityResponse[];
}

export class AbcEntityResponse {
    public declare name: string;
    public declare amount: number;
    public declare percent: number;
}
