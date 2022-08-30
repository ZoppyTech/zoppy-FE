import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbService {
    public items: Array<Breadcrumb> = [];
    public constructor() {}
}

export interface Breadcrumb {
    name: string;
    route: string | undefined;
}
