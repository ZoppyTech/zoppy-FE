import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SideMenuService {
    public selected: SideMenu = `home`;
    public subSelected: SideMenu = 'accessKeys';
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
    | `myCompany`
    | `configurations`
    | `whatsapp`
    | `accessKeys`
    | `accessTokens`
    | `letalk`
    | `syncData`
    | `giftback`
    | `myProfile`
    | 'myCompanyConfig'
    | 'myCompanyUsers'
    | 'membership'
    | 'registerSale'
    | 'products'
    | 'customers'
    | 'coupons'
    | 'whatsappConfig'
    | 'whatsappTemplateList'
    | 'none';

export interface SideMenuItem {
    id: SideMenu;
    icon: string;
    label: string;
    route: string | null;
    visible: boolean;
    subItems?: Array<SideMenuItem>;
    subItemsOpened?: boolean;
    class?: string;
}
