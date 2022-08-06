import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RefreshTokenRequest } from 'src/shared/models/requests/public/refresh-token.request';
import { LoginResponse } from 'src/shared/models/responses/public/login.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { PublicService } from 'src/shared/services/public/public.service';
import { Navigation } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
    public constructor(private readonly storage: Storage, private readonly publicService: PublicService, private readonly router: Router) {}

    public async ngOnInit(): Promise<void> {
        await this.fetchCredentials();
    }

    private async fetchCredentials(): Promise<void> {
        debugger;
        if (!this.storage.getToken()) {
            this.router.navigate([Navigation.routes.login]);
            return;
        }

        try {
            const request: RefreshTokenRequest = {
                oldToken: this.storage.getToken() as string
            };
            const token: LoginResponse = await this.publicService.refreshToken(request);
            token;
        } catch (ex: ZoppyException | any) {
            this.router.navigate([Navigation.routes.login]);
        }
    }
}
