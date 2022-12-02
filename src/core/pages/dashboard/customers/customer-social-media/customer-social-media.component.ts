import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '@ZoppyTech/toast';
import { environment } from 'src/environments/environment';
import { MessageConfigConstants, MessageConfigTemplate } from 'src/shared/constants/message-config.constants';
import { TaskConstants, TaskContactTypes, TaskStatus, TaskTypes } from 'src/shared/constants/task.constants';
import { SocialMediaRequest } from 'src/shared/models/requests/social-media/social-media.request';
import { SocialMediaCustomerDetailResponse } from 'src/shared/models/responses/social-media/social-media-customer-detail.response';
import { SocialMediaCustomerTaskResponse } from 'src/shared/models/responses/social-media/social-media-customer-task.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { CrmCustomerService } from 'src/shared/services/crm-customer/crm-customer.service';
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
    public loadingNewTask: boolean = false;
    public loadingOpenLink: boolean = false;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;
    public id: string = '';
    public task: SocialMediaRequest = new SocialMediaRequest();
    public tasks: SocialMediaCustomerTaskResponse[] = [];
    public details: SocialMediaCustomerDetailResponse = new SocialMediaCustomerDetailResponse();
    public taskTypes: TypeItem[] = [
        {
            label: 'Observações',
            value: TaskConstants.TYPES.OBSERVATION
        },
        {
            label: 'Venda',
            value: TaskConstants.TYPES.SALE
        },
        {
            label: 'Atividades',
            value: TaskConstants.TYPES.TASK
        }
    ];

    public contactTypes: TypeItem[] = [
        {
            label: 'Contato via ligação',
            value: TaskConstants.CONTACT_TYPES.CALL
        },
        {
            label: 'Contato via Whatsapp',
            value: TaskConstants.CONTACT_TYPES.WHATSAPP
        },
        {
            label: 'Visita na loja',
            value: TaskConstants.CONTACT_TYPES.STORE
        },
        {
            label: 'Outro',
            value: TaskConstants.CONTACT_TYPES.OTHER
        }
    ];

    public statusTypes: TypeItem[] = [
        {
            label: 'icon-mood_bad',
            value: TaskConstants.STATUS.NEGATIVE,
            class: 'negative'
        },
        {
            label: 'icon-sentiment_neutral',
            value: TaskConstants.STATUS.WARN,
            class: 'warning'
        },
        {
            label: 'icon-mood',
            value: TaskConstants.STATUS.SUCCESS,
            class: 'success'
        }
    ];

    public constructor(
        private readonly socialMediaService: SocialMediaService,
        private readonly crmCustomerService: CrmCustomerService,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly toast: ToastService,
        public breadcrumb: BreadcrumbService,
        public sideMenuService: SideMenuService
    ) {}

    public async ngOnInit(): Promise<void> {
        this.sideMenuService.change('customers');
        this.id = this.route.snapshot.paramMap.get('id') ?? '';
        await this.fetchData();
        this.setBreadcrumb();
    }

    public async sendMessage(): Promise<void> {
        this.loadingOpenLink = true;
        try {
            const data: any = await this.crmCustomerService.findWhatsappLink(
                this.id,
                MessageConfigConstants.AFTER_SALE_MESSAGE as MessageConfigTemplate
            );
            window?.open(data.data, '_blank')?.focus();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Houve um erro');
        } finally {
            this.loadingOpenLink = false;
        }
    }

    public async fetchData(): Promise<void> {
        this.loaded = false;
        try {
            this.tasks = await this.socialMediaService.list(this.id);
            this.details = await this.socialMediaService.details(this.id);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Houve um erro');
        } finally {
            this.loaded = true;
        }
    }

    public async save(): Promise<void> {
        this.loadingNewTask = true;
        try {
            await this.socialMediaService.create(this.id, this.task);
            await this.fetchData();
            this.task = new SocialMediaRequest();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Houve um erro');
        } finally {
            this.loadingNewTask = false;
        }
    }

    public getTaskTypeLabel(task: SocialMediaCustomerTaskResponse): string {
        return TaskUtil.getTypeLabel(task.type);
    }

    public getTaskContactTypeLabel(task: SocialMediaCustomerTaskResponse): string {
        return TaskUtil.getContactTypeLabel(task.contactType as TaskContactTypes);
    }

    public getStatusLabel(task: SocialMediaCustomerTaskResponse): string {
        return TaskUtil.getStatusLabel(task.status as TaskStatus);
    }

    public getGender(): string {
        return GenderUtil.getLabel(this.details?.gender);
    }

    public getMatrixRfmClassification(): string {
        return MatrixRfmUtil.getLabel(this.details?.rfm?.position);
    }

    public selectType(type: TypeItem): void {
        this.task.taskType = type.value as TaskTypes;
    }

    public selectStatus(type: TypeItem): void {
        this.task.status = type.value as TaskStatus;
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
                name: this.details?.name ?? '',
                route: undefined
            }
        ];
    }

    public async update(): Promise<void> {
        this.router.navigate([Navigation.routes.customers, this.details.customerId]);
    }
}

interface TypeItem {
    label: string;
    value: TaskTypes | TaskContactTypes | TaskStatus;
    class?: string;
}
