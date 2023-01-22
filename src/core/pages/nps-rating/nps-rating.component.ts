import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '@ZoppyTech/toast';
import { environment } from 'src/environments/environment';
import { PublicService } from 'src/shared/services/public/public.service';

@Component({
    selector: 'nps-rating',
    templateUrl: './nps-rating.component.html',
    styleUrls: ['./nps-rating.component.scss']
})
export class NpsRatingComponent {
    //public fields: Field[] = [];
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
    }

    public async verifyToken(): Promise<void> {
        try {
            this.isLoading = true;
            // const isValidToken: boolean = await this.publicService.validateNpsToken(this.token);
            // if (!isValidToken) {
            //     this.currentComponent = NpsComponents.PageNotFoundComponent;
            // }
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
