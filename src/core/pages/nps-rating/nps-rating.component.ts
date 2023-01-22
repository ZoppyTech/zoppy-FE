import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '@ZoppyTech/toast';
import { environment } from 'src/environments/environment';
import { NpsRequest } from 'src/shared/models/requests/nps/nps.request';
import { PublicService } from 'src/shared/services/public/public.service';

@Component({
    selector: 'nps-rating',
    templateUrl: './nps-rating.component.html',
    styleUrls: ['./nps-rating.component.scss']
})
export class NpsRatingComponent {
    public declare npsRequest: NpsRequest;
    public isLoading: boolean = true;
    public loadingIcon: string = `${environment.publicBucket}/imgs/loading.svg`;
    public acceptTerms: boolean = false;
    public currentComponent: string = NpsComponents.SupportComponent;
    public token: string = '';

    public constructor(
        private readonly publicService: PublicService,
        private readonly toast: ToastService,
        private readonly router: Router,
        private readonly route: ActivatedRoute
    ) {}

    public ngOnInit() {
        this.route.paramMap.subscribe((paramMap: any) => {
            this.token = paramMap.get('token');
            this.verifyToken();
        });
        this.npsRequest = {
            accessToken: this.token
        };
    }

    public async verifyToken(): Promise<void> {
        try {
            this.isLoading = true;
            const isValidToken: boolean = await this.publicService.validateNpsToken(this.token);
            if (!isValidToken) {
                this.currentComponent = NpsComponents.PageNotFoundComponent;
            }
        } catch (ex: any) {
            this.toast.error(ex.message, 'Erro');
        } finally {
            this.isLoading = false;
        }
    }

    public async onSubmitNpsReview(): Promise<void> {
        try {
            this.isLoading = true;
            await this.publicService.submitNpsReview(this.npsRequest);
            this.currentComponent = NpsComponents.CongratulationsComponent;
        } catch (ex: any) {
            this.toast.error(ex.message, 'Erro');
        } finally {
            this.isLoading = false;
        }
    }
}

export enum NpsComponents {
    SupportComponent = 'support-component',
    ProductComponent = 'product-component',
    RecommendationComponent = 'recommendation-component',
    CommentaryOrSuggestionComponent = 'commentary-or-suggestion-component',
    PageNotFoundComponent = 'page-not-found-component',
    CongratulationsComponent = 'congratulations-component'
}
