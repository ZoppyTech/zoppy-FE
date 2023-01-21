import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PublicService } from 'src/shared/services/public/public.service';

@Component({
    selector: 'nps-rating',
    templateUrl: './nps-rating.component.html',
    styleUrls: ['./nps-rating.component.scss']
})
export class NpsRatingComponent {
    //public fields: Field[] = [];
    public loading: boolean = false;
    public acceptTerms: boolean = false;

    public constructor(private readonly router: Router) {}

    public ngOnInit() {}
}
