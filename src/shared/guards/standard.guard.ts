import { Injectable } from '@angular/core';
import { CanActivate, Route, Router } from '@angular/router';
import { CompanyEntity } from '../models/entities/company.entity';
import { CompanyUtil } from '../utils/company.util';
import { Storage } from '../utils/storage';
import { Navigation } from 'src/shared/utils/navigation';

@Injectable()
export class StandardGuard implements CanActivate {
    public constructor(private readonly storage: Storage, private readonly router: Router) {}

    public canActivate(): boolean {
        const isStandard: boolean = CompanyUtil.isStandard(this.storage.getCompany() as CompanyEntity);
        if (!isStandard) {
            this.router.navigate([Navigation.routes.landing]);
        }
        return isStandard;
    }
}
