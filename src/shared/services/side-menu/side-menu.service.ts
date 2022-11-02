import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SideMenuService {
    public selected: SideMenu = `home`;
    public subSelected: SideMenu = 'access-keys';
    public open: boolean = false;
    public constructor() {}

    public change(selected: SideMenu): void {
        this.selected = selected;

        if (!['configurations', 'my-profile'].includes(this.selected)) {
            this.changeSub('none');
        }
    }

    public changeSub(selected: SideMenu): void {
        this.subSelected = selected;
    }
}

export type SideMenu =
    | 'home'
    | 'reports'
    | `my-company`
    | `configurations`
    | `whatsapp`
    | `access-keys`
    | `access-tokens`
    | `letalk`
    | `sync-data`
    | `giftback`
    | `my-profile`
    | 'my-company-config'
    | 'my-company-users'
    | 'customers'
    | 'none';

export interface SideMenuItem {
    id: SideMenu;
    icon: string;
    label: string;
    route: string | null;
    visible: boolean;
    subItems?: Array<SideMenuItem>;
    subItemsOpened?: boolean;
}
