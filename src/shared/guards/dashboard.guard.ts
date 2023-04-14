import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PublicService } from '../services/public/public.service';
import { Storage } from '../utils/storage';
import { CompanyService } from '../services/company/company.service';
import { BooleanResponse } from '../services/api.service';
import { Navigation } from '../utils/navigation';
import { CompanyEntity } from '../models/entities/company.entity';
import { AppConstants } from '@ZoppyTech/utilities';

@Injectable()
export class DashboardGuard implements CanActivate {
    public constructor(
        private readonly router: Router,
        private readonly publicService: PublicService,
        private readonly storage: Storage,
        private readonly companyService: CompanyService
    ) {}

    public async canActivate(): Promise<boolean> {
        const company: CompanyEntity = this.storage.getCompany() as CompanyEntity;

        if (!this.storage.getCompany() || !this.storage.getUser()) {
            this.publicService.logout();
        }

        if (company.plan !== AppConstants.PLANS.FREE) return true;

        const isBlocked: BooleanResponse = await this.companyService.getBlockedFreeTier();
        if (isBlocked.result && !this.router.url.includes(Navigation.routes.signature)) {
            this.router.navigate([Navigation.routes.blocked]);
            return true;
        }

        return true;
    }
}
