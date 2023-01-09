import { Injectable } from '@angular/core';
import { CanActivate, Route, Router } from '@angular/router';
import { CompanyEntity } from '../models/entities/company.entity';
import { CompanyUtil } from '../utils/company.util';
import { Storage } from '../utils/storage';
import { Navigation } from 'src/shared/utils/navigation';

@Injectable()
export class PremiumGuard implements CanActivate {
    public constructor(private readonly storage: Storage, private readonly router: Router) {}

    public canActivate(): boolean {
        const isPremium: boolean = CompanyUtil.isPremium(this.storage.getCompany() as CompanyEntity);
        if (!isPremium) this.router.navigate([Navigation.routes.landing]);
        return isPremium;
    }
}
