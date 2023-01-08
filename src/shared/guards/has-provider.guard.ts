import { Injectable } from '@angular/core';
import { CanActivate, Route, Router } from '@angular/router';
import { CompanyEntity } from '../models/entities/company.entity';
import { CompanyUtil } from '../utils/company.util';
import { Storage } from '../utils/storage';
import { Navigation } from 'src/shared/utils/navigation';

@Injectable()
export class HasProviderGuard implements CanActivate {
    public constructor(private readonly storage: Storage, private readonly router: Router) {}

    public canActivate(): boolean {
        const isShopify: boolean = CompanyUtil.isShopify(this.storage.getCompany() as CompanyEntity);
        const isWooCommerce: boolean = CompanyUtil.isWooCommerce(this.storage.getCompany() as CompanyEntity);
        const isNuvemshop: boolean = CompanyUtil.isNuvemshop(this.storage.getCompany() as CompanyEntity);
        if (!isShopify && !isWooCommerce && !isNuvemshop) {
            this.router.navigate([Navigation.routes.batchUpload]);
            return false;
        }
        return true;
    }
}
