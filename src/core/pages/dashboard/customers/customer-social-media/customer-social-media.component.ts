import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '@ZoppyTech/toast';
import { environment } from 'src/environments/environment';
import { SocialMediaCustomerDetailResponse } from 'src/shared/models/responses/social-media/social-media-customer-detail.response';
import { SocialMediaCustomerTaskResponse } from 'src/shared/models/responses/social-media/social-media-customer-task.response';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { SocialMediaService } from 'src/shared/services/social-media/social-media.service';
import { GenderUtil } from 'src/shared/utils/gender.util';
import { MatrixRfmUtil } from 'src/shared/utils/matrix-rfm.util';
import { Navigation } from 'src/shared/utils/navigation';
import { TaskUtil } from 'src/shared/utils/task.util';

@Component({
    selector: 'app-customer-social-media',
    templateUrl: './customer-social-media.component.html',
    styleUrls: ['./customer-social-media.component.scss']
})
export class CustomerSocialMediaComponent implements OnInit {
    public loaded: boolean = false;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;
    public id: string = '';
    public tasks: SocialMediaCustomerTaskResponse[] = [];
    public details: SocialMediaCustomerDetailResponse = new SocialMediaCustomerDetailResponse();

    public constructor(
        private readonly socialMediaService: SocialMediaService,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly toast: ToastService,
        public breadcrumb: BreadcrumbService,
        public sideMenuService: SideMenuService
    ) {}

    public async ngOnInit(): Promise<void> {
        this.sideMenuService.change('customers');
        this.setBreadcrumb();
        this.id = this.route.snapshot.paramMap.get('id') ?? '';
        await this.fetchData();
    }

    public async fetchData(): Promise<void> {
        try {
            this.tasks = await this.socialMediaService.list(this.id);
            this.details = await this.socialMediaService.details(this.id);
        } catch (ex) {
        } finally {
            this.loaded = true;
        }
    }

    public getTaskTypeLabel(task: SocialMediaCustomerTaskResponse): string {
        return TaskUtil.getTypeLabel(task.type);
    }

    public getGender(): string {
        return GenderUtil.getLabel(this.details?.gender);
    }

    public getMatrixRfmClassification(): string {
        return MatrixRfmUtil.getLabel(this.details?.rfm?.position);
    }

    private setBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Início`,
                route: undefined
            },
            {
                name: `Área de membros`,
                route: Navigation.routes.customers
            },
            {
                name: this.details?.userName ?? '',
                route: undefined
            }
        ];
    }

    public async update(): Promise<void> {
        this.router.navigate([Navigation.routes.customers, this.details.customerId]);
    }
}
