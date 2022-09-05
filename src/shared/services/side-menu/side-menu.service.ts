import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SideMenuService {
    public selected: SideMenu = `reports`;
    public subSelected: SideMenu = 'access-keys';
    public open: boolean = false;
    public constructor() {}

    public change(selected: SideMenu): void {
        this.selected = selected;
    }

    public changeSub(selected: SideMenu): void {
        this.subSelected = selected;
    }
}

export type SideMenu = 'reports' | `my-company` | `configurations` | `access-keys` | `access-tokens` | `sync-data` | `giftback`;

export interface SideMenuItem {
    id: SideMenu;
    icon: string;
    label: string;
    route: string | null;
    subItems?: Array<SideMenuItem>;
    subItemsOpened?: boolean;
}
