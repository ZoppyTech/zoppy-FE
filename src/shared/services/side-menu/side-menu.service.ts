import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SideMenuService {
    public selected: SideMenu = `home`;
    public subSelected: SideMenu = 'accessKeys';
    public accountSelected: SideMenu = 'myProfile';
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

    public changeSubAccount(selected: SideMenu): void {
        this.accountSelected = selected;
    }
}

export type SideMenu =
    | 'batchUpload'
    | 'changePassword'
    | 'coupons'
    | 'customers'
    | 'home'
    | 'membership'
    | 'myCompanyConfig'
    | 'myCompanyUsers'
    | 'none'
    | 'products'
    | 'registerSale'
    | 'reports'
    | 'salesPanel'
    | 'whatsappConfig'
    | 'whatsappTemplateList'
    | `accessKeys`
    | `accessTokens`
    | `configurations`
    | `giftback`
    | `letalk`
    | `messageConfig`
    | `myCompany`
    | `myProfile`
    | `signature`
    | `syncData`
    | `updatePassword`
    | `whatsapp`;

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
