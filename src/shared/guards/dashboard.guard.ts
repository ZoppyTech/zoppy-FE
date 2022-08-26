/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { PublicService } from '../services/public/public.service';
import { Storage } from '../utils/storage';

@Injectable()
export class DashboardGuard implements CanActivate {
    public constructor(private readonly publicService: PublicService, private readonly storage: Storage) {}

    public canActivate(): boolean {
        if (!this.storage.getCompany() || !this.storage.getUser()) {
            this.publicService.logout();
        }
        return true;
    }
}
