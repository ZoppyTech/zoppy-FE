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

    public updatePagination(pagination: Pagination): void {
        this.page = pagination.page;
        this.pageSize = pagination.pageSize;
        this.totalPages = pagination.totalPages;
        this.totalRecords = pagination.totalRecords;
    }

    public endOfPage(): boolean {
        return this.page > this.totalPages;
    }

    public increasePage(): void {
        if (this.page > this.totalPages) {
            return;
        }
        this.page = this.page + 1;
    }

    public decreasePage(): void {
        if (this.page > this.totalPages) {
            return;
        }
        this.page = this.page - 1;
    }

    public reset(): void {
        this.page = 1;
        this.totalPages = 1;
        this.totalRecords = 1;
    }
}

export type OrderByDirection = 'ASC' | 'DESC';

export class ZoppyFilter<T> {
    public searchText: string = '';
    public searchFields: Array<string> = [];
    public orderBy: OrderBy[] = new Array<OrderBy>();
    public pagination: Pagination = new Pagination();
    public data: Array<T> = [];
}
