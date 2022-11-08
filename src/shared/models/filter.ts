export interface PaginationParameters {
    minLimit: number;
    maxLimit: number;
}

export class OrderBy {
    public property: string = '';
    public direction: OrderByDirection = 'ASC';
}

export class Pagination {
    public page: number = 1;
    public pageSize: number = 20;
    public totalPages: number = 1;
    public totalRecords: number = 1;

    public static getPaginationParameters(pagination: Pagination): PaginationParameters {
        return {
            minLimit: (pagination.page - 1) * pagination.pageSize,
            maxLimit: pagination.page * pagination.pageSize
        };
    }
}

export type OrderByDirection = 'ASC' | 'DESC';

export class ZoppyFilter<T> {
    public searchText: string = '';
    public searchFields: Array<string> = [];
    public orderBy: OrderBy[] = new Array<OrderBy>();
    public pagination: Pagination = new Pagination();
    public data: T[] = [];
}
