import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '@ZoppyTech/toast';
import {
    TaskConstants,
    TaskContactTypes,
    TaskTypes,
    MessageConfigConstants,
    TaskStatus,
    GenderUtil,
    MatrixRfmUtil
} from '@ZoppyTech/utilities';
import { environment } from 'src/environments/environment';
import { Modal, ModalService } from 'src/shared/components/modal/modal.service';
import { SalesPanelContactRequest } from 'src/shared/components/modal/sales-panel-contact/sales-panel-contact.request';
import { ViewCustomerEntity } from 'src/shared/models/entities/view-customer.entity';
import { CrmCustomerRequest } from 'src/shared/models/requests/crm/crm-customer.request';
import { SocialMediaRequest } from 'src/shared/models/requests/social-media/social-media.request';
import { CrmCustomerLinkResponse } from 'src/shared/models/responses/crm/crm-customer-link.response';
import { SocialMediaCustomerDetailResponse } from 'src/shared/models/responses/social-media/social-media-customer-detail.response';
import { SocialMediaCustomerTaskResponse } from 'src/shared/models/responses/social-media/social-media-customer-task.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { CrmCustomerService } from 'src/shared/services/crm-customer/crm-customer.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { SocialMediaService } from 'src/shared/services/social-media/social-media.service';
import { ViewCustomerService } from 'src/shared/services/view-customer/view-customer.service';
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
    public loadingOpenLinkBirthDay: boolean = false;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;
    public id: string = '';
    public today: Date = new Date();
    public task: SocialMediaRequest = new SocialMediaRequest();
    public tasks: SocialMediaCustomerTaskResponse[] = [];
    public customer?: ViewCustomerEntity;
    public details: SocialMediaCustomerDetailResponse = new SocialMediaCustomerDetailResponse();
    public statuses: TypeItem[] = [
        {
            label: 'Não quero receber mensagens',
            value: true
        },
        {
            label: 'Quero receber mensagens',
            value: false
        }
    ];
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
            label: 'icon-mood',
            value: TaskConstants.STATUS.SUCCESS,
            class: 'success'
        },
        {
            label: 'icon-sentiment_neutral',
            value: TaskConstants.STATUS.WARN,
            class: 'warning'
        },
        {
            label: 'icon-mood_bad',
            value: TaskConstants.STATUS.NEGATIVE,
            class: 'negative'
        }
    ];

    public constructor(
        private fb: FormBuilder,
        private readonly socialMediaService: SocialMediaService,
        private readonly crmCustomerService: CrmCustomerService,
        private readonly viewCustomerService: ViewCustomerService,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly toast: ToastService,
        public breadcrumb: BreadcrumbService,
        public sideMenuService: SideMenuService,
        public modal: ModalService
    ) {}

    public async ngOnInit(): Promise<void> {
        this.sideMenuService.change('customers');
        this.id = this.route.snapshot.paramMap.get('id') ?? '';
        await this.fetchData();
        this.setBreadcrumb();
    }

    public async updateCustomer(block: boolean): Promise<void> {
        if (!this.customer) return;
        try {
            const request: CrmCustomerRequest = {
                id: this.id,
                billingId: this.customer.addressId,
                firstName: this.customer.firstName,
                lastName: this.customer.lastName,
                companyName: '',
                address1: this.customer.address1,
                address2: this.customer.address2,
                city: this.customer.city,
                state: this.customer.state,
                postcode: this.customer.postcode,
                country: this.customer.country,
                email: this.customer.email,
                phone: this.customer.phone,
                birthDate: this.customer.birthDate,
                gender: this.customer.gender,
                block: block
            };

            await this.crmCustomerService.update(this.id, request);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Houve um erro');
        }
    }

    public openStatusInfo(): void {
        this.modal.open(Modal.IDENTIFIER.INFO, {
            title: 'Status',
            button: 'Entendi',
            description: `O status é referente ao desejo do seu cliente de receber mensagens. Caso seu cliente não queira mais receber suas mensagens, selecione a opção "Não quer receber mensagens" e ele será descadastrado da sua lista.`
        });
    }

    public visibleProducts(task: SocialMediaCustomerTaskResponse): boolean {
        return (task.order && task.order.products && task.order.products.length > 0) as boolean;
    }

    public async call(): Promise<void> {
        window.open(`tel:+55${this.customer?.phone}`, '_self');
    }

    public async createTask(contactType: TaskContactTypes, taskType: TaskTypes | string): Promise<void> {
        if (contactType === TaskConstants.CONTACT_TYPES.WHATSAPP) await this.sendMessage(taskType);
        else if (contactType === TaskConstants.CONTACT_TYPES.CALL) await this.call();

        const contactRequest: SalesPanelContactRequest = {
            icon: 'icon-wpp',
            title: 'Registro de atividade',
            subtitle: `A Zoppy quer saber se você conseguiu efetuar o contato com o(a) ${this.customer?.firstName} para podermos registrar em seu histórico?`,
            question: {
                label: 'O contato foi realizado?',
                options: [
                    {
                        value: true,
                        label: 'Sim'
                    },
                    {
                        value: false,
                        label: 'Não'
                    }
                ],
                response: ''
            },
            description: {
                value: '',
                placeholder: 'Descreva como foi o contato'
            },
            contactType: {
                label: 'Como foi feito o contato?',
                options: [
                    {
                        value: TaskConstants.CONTACT_TYPES.CALL,
                        label: 'Contato via ligação'
                    },
                    {
                        value: TaskConstants.CONTACT_TYPES.WHATSAPP,
                        label: 'Contato via whatsapp'
                    }
                ],
                response: contactType
            },
            statusType: {
                label: 'Classifique a atividade',
                options: [
                    {
                        label: 'icon-mood',
                        value: TaskConstants.STATUS.SUCCESS,
                        class: 'success',
                        explanation: 'Houve contato com sucesso'
                    },
                    {
                        label: 'icon-sentiment_neutral',
                        value: TaskConstants.STATUS.WARN,
                        class: 'warning',
                        explanation: 'Não houve contato'
                    },
                    {
                        label: 'icon-mood_bad',
                        value: TaskConstants.STATUS.NEGATIVE,
                        class: 'negative',
                        explanation: 'Houve contato com resposta negativa do cliente'
                    }
                ],
                response: TaskConstants.STATUS.SUCCESS,
                selectStatus: (modalData: SalesPanelContactRequest, status: string) => {
                    modalData.statusType.response = status;
                }
            }
        };

        this.modal.open(Modal.IDENTIFIER.SALES_PANEL_CONTACT, contactRequest, async (response: SalesPanelContactRequest) => {
            if (!response.question.response) response.statusType.response = TaskConstants.STATUS.WARN;
            const request: SocialMediaRequest = {
                taskType: taskType as TaskTypes,
                description: response.description.value,
                contactType: response.contactType.response as any,
                status: response.statusType.response as any
            };
            try {
                await this.socialMediaService.create(this.customer?.id as string, request);
                setTimeout(async () => {
                    await this.fetchData();
                });
            } catch (ex: any) {
                ex = ex as ZoppyException;
                this.toast.error(ex.message, 'Não foi possível obter os dados');
            } finally {
                this.modal.close();
            }
        });
    }

    public isBirthDay(): boolean {
        if (!this.customer || !this.customer.birthDate) return false;
        const birthDate: Date = new Date(this.customer.birthDate);
        return birthDate.getDate() === this.today.getDate() && birthDate.getMonth() === this.today.getMonth();
    }

    public checkVisibility(index: number): boolean {
        if (index === 0) return true;
        return this.tasks[index - 1]?.createdAt?.getDate() !== this.tasks[index]?.createdAt?.getDate();
    }

    public async sendMessage(taskType: string): Promise<void> {
        taskType === 'birthday' ? (this.loadingOpenLinkBirthDay = true) : (this.loadingOpenLink = true);
        try {
            const data: CrmCustomerLinkResponse = await this.crmCustomerService.findWhatsappLink({
                customerId: this.id,
                linkTemplateId: taskType
            });
            window
                ?.open(`https://api.whatsapp.com/send/?phone=${encodeURIComponent(data.phoneNumber)}&text=${data.text}`, '_blank')
                ?.focus();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Houve um erro');
        } finally {
            taskType === 'birthday' ? (this.loadingOpenLinkBirthDay = false) : (this.loadingOpenLink = false);
        }
    }

    public async fetchData(): Promise<void> {
        this.loaded = false;
        try {
            this.tasks = await this.socialMediaService.list(this.id);
            this.details = await this.socialMediaService.details(this.id);
            this.customer = await this.viewCustomerService.findById(this.id);
            for (const task of this.tasks) {
                task.createdAt = new Date(task.createdAt);
            }
            this.filterMapNpsTasks();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Houve um erro');
        } finally {
            this.loaded = true;
        }
    }

    private filterMapNpsTasks() {
        this.tasks = this.tasks.filter((task: SocialMediaCustomerTaskResponse) => {
            if (task.type !== TaskConstants.TYPES.NPS_RATING) return true;
            if (task.npsRating && task.npsRating.answered) return true;
            return false;
        });
        this.tasks = this.tasks.map((task: SocialMediaCustomerTaskResponse) => {
            if (task.type !== TaskConstants.TYPES.NPS_RATING) return task;
            if (!task.npsRating) return task;
            task.npsRating.formStarSupport = this.fb.group({
                rating: [task.npsRating.supportGrade + '', Validators.required]
            });
            task.npsRating.formStarProduct = this.fb.group({
                rating: [task.npsRating.productGrade + '', Validators.required]
            });
            return task;
        });
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

    public getStatusLabelExplanation(task: SocialMediaCustomerTaskResponse): string {
        return TaskUtil.getStatusLabelExplanation(task.status as TaskStatus);
    }

    public getGender(): string {
        return GenderUtil.getLabel(this.details?.gender);
    }

    public getMatrixRfmClassification(): string {
        return MatrixRfmUtil.getLabel(this.details?.rfm?.position);
    }

    public selectType(type: TypeItem): void {
        this.task.taskType = type.value as TaskTypes;
        if (this.task.taskType === TaskConstants.TYPES.SALE) this.router.navigate([Navigation.routes.sales, this.customer?.phone]);
    }

    public selectStatus(type: TypeItem): void {
        this.task.status = type.value as TaskStatus;
    }

    private setBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Início`,
                route: Navigation.routes.home
            },
            {
                name: `Área de membros`,
                route: Navigation.routes.customers
            },
            {
                name: this.details?.name ?? 'Novo',
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
    value: TaskTypes | TaskContactTypes | TaskStatus | boolean;
    class?: string;
}
