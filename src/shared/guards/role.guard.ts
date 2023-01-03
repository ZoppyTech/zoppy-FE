import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { ToastService } from '@ZoppyTech/toast';
import { Navigation } from '../utils/navigation';
import { Storage } from '../utils/storage';

@Injectable()
export class RoleGuard implements CanActivate {
    public constructor(private readonly storage: Storage, private readonly router: Router, private readonly toastService: ToastService) {}

    public canActivate(route: ActivatedRouteSnapshot): boolean {
        const roles: Array<string> = route.data['roles'];
        if (!roles) return true;

        const allowed: boolean = roles.includes(this.storage.getUser()?.role as string);

        if (!allowed) {
            this.router.navigate([Navigation.routes.landing]);
            this.toastService.error('Seu usuário não tem acesso a essa página', 'Usuário náo autorizado.');
        }

        return allowed;
    }
}
