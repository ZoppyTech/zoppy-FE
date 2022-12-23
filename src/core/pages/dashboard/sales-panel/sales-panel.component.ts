import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '@ZoppyTech/toast';
import { environment } from 'src/environments/environment';
import { Modal, ModalService } from 'src/shared/components/modal/modal.service';
import { MessageConfigConstants, MessageConfigTemplate } from 'src/shared/constants/message-config.constants';
import { TaskConstants } from 'src/shared/constants/task.constants';
import { TaskEntity } from 'src/shared/models/entities/task.entity';
import { WcCustomerEntity } from 'src/shared/models/entities/wc-customer.entity';
import { SalesPanelRequest } from 'src/shared/models/requests/social-media/sales-panel.request';
import { SocialMediaRequest } from 'src/shared/models/requests/social-media/social-media.request';
import { SocialMediaMatrixRfmResponse } from 'src/shared/models/responses/social-media/social-media-matrix-rfm.response';
import { SocialMediaSalesPanelResponse, TaskView } from 'src/shared/models/responses/social-media/social-media-sales-panel.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { CrmCustomerService } from 'src/shared/services/crm-customer/crm-customer.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { SocialMediaService } from 'src/shared/services/social-media/social-media.service';
import { DateUtil, FirstAndLastDayOfWeek } from 'src/shared/utils/date.util';
import { Navigation } from 'src/shared/utils/navigation';
import { TaskUtil } from 'src/shared/utils/task.util';
import { Day, Rfm, SalesPanelMapper } from './sales-panel.mapper';

@Component({
    selector: 'app-sales-panel',
    templateUrl: './sales-panel.component.html',
    styleUrls: ['./sales-panel.component.scss']
})
export class SalesPanelComponent implements OnInit {
    public days: Day[] = [];
    public rfms: Rfm[] = [];
    public loading: boolean = false;
    public filter: SalesPanelRequest = new SalesPanelRequest();
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;

    public constructor(
        public modal: ModalService,
        private readonly toast: ToastService,
        private readonly socialMediaService: SocialMediaService,
        private readonly crmCustomerService: CrmCustomerService,
        public router: Router,
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService
    ) {}

    public async ngOnInit() {
        this.sideMenuService.change('salesPanel');
        this.setBreadcrumb();
        const firstAndlastDay: FirstAndLastDayOfWeek = DateUtil.getFirstAndLastDayOfCurrentWeek();
        this.filter.maxDate = firstAndlastDay.lastday;
        this.filter.minDate = firstAndlastDay.firstday;
        await this.fetchData();
    }

    public async fetchData(): Promise<void> {
        this.loading = true;
        try {
            const salesPanel: SocialMediaSalesPanelResponse = await await this.socialMediaService.listSalesPanel(
                this.filter as SalesPanelRequest
            );
            salesPanel.tasks.forEach((task: TaskEntity) => {
                task.scheduledDate = new Date(task.scheduledDate);
            });
            this.days = SalesPanelMapper.mapDays(salesPanel.tasks, this.filter);
            this.rfms = SalesPanelMapper.mapRfm(salesPanel.rfm);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter os dados');
        } finally {
            setTimeout(() => {
                this.loading = false;
            });
        }
    }

    public getTaskTypeLabel(task: TaskView): string {
        return TaskUtil.getTypeLabel(task.type);
    }

    public async sendMessage(task: TaskView): Promise<void> {
        task.loading = true;
        try {
            let message: string = '';
            if (task.type === TaskConstants.TYPES.BIRTHDAY) message = MessageConfigConstants.BIRTHDAY_MESSAGE as MessageConfigTemplate;
            if (task.type === TaskConstants.TYPES.CANT_LOSE)
                message = MessageConfigConstants.CANT_LOSE_CLIENT_MESSAGE as MessageConfigTemplate;
            else message = MessageConfigConstants.AFTER_SALE_MESSAGE as MessageConfigTemplate;
            const data: any = await this.crmCustomerService.findWhatsappLink(task.customer.id, message as MessageConfigTemplate);
            window?.open(data.data, '_blank')?.focus();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Houve um erro');
        } finally {
            task.loading = false;
        }
    }

    public async details(customer: SocialMediaMatrixRfmResponse): Promise<void> {
        this.router.navigate([Navigation.routes.customerSocialMedia, customer.customerId]);
    }

    public async createTask(customer: SocialMediaMatrixRfmResponse): Promise<void> {
        customer.loading = true;
        const task: TaskView = {} as TaskView;
        task.contactType = TaskConstants.CONTACT_TYPES.WHATSAPP;
        task.type = TaskConstants.TYPES.CANT_LOSE;
        task.customer = customer.customer;
        task.customer.address = customer.address;
        await this.sendMessage(task as TaskView);
        customer.loading = false;
        this.modal.open(
            Modal.IDENTIFIER.INPUT_INFO,
            {
                title: `Conseguiu efetuar o contato com o(a) ${task.customer?.address?.firstName}?`,
                subtitle: 'Descreva como foi esse contato, qualquer informação que auxilie no processo de retenção do cliente',
                cancelLabel: 'Cancelar',
                placeholder: '',
                mask: '',
                rows: 4,
                selectAll: false,
                confirmLabel: 'Confirmar',
                value: task.description
            },
            async (description: string) => {
                task.description = description;
                const request: SocialMediaRequest = {
                    taskType: task.type,
                    description: task.description,
                    contactType: task.contactType ?? TaskConstants.CONTACT_TYPES.WHATSAPP,
                    status: TaskConstants.STATUS.SUCCESS
                };
                try {
                    await this.socialMediaService.create(task.customer.id, request);
                    setTimeout(async () => {
                        await this.fetchData();
                        this.toast.success('Tarefa concluída', 'Sucesso');
                    });
                } catch (ex: any) {
                    ex = ex as ZoppyException;
                    this.toast.error(ex.message, 'Não foi possível obter os dados');
                } finally {
                    this.loading = false;
                    this.modal.close();
                }
            }
        );
    }

    public async openTaskDescriptionModal(task: TaskView): Promise<void> {
        if (task.status === TaskConstants.STATUS.SUCCESS) {
            this.toast.alert('Tarefa já concluída', 'Atenção');
            return;
        }
        await this.sendMessage(task);
        this.modal.open(
            Modal.IDENTIFIER.INPUT_INFO,
            {
                title: `Conseguiu efetuar o contato com o(a) ${task.customer?.address?.firstName}?`,
                subtitle: 'Descreva como foi esse contato, qualquer informação que auxilie no processo de retenção do cliente',
                cancelLabel: 'Cancelar',
                placeholder: '',
                mask: '',
                rows: 4,
                selectAll: false,
                confirmLabel: 'Confirmar',
                value: task.description
            },
            async (description: string) => {
                task.description = description;
                const request: SocialMediaRequest = {
                    taskType: task.type,
                    description: task.description,
                    contactType: task.contactType ?? TaskConstants.CONTACT_TYPES.WHATSAPP,
                    status: TaskConstants.STATUS.SUCCESS
                };
                try {
                    task.id
                        ? await this.socialMediaService.update(task.customer.id, task.id, request)
                        : await this.socialMediaService.create(task.customer.id, request);
                    setTimeout(async () => {
                        await this.fetchData();
                        this.toast.success('Tarefa concluída', 'Sucesso');
                    });
                } catch (ex: any) {
                    ex = ex as ZoppyException;
                    this.toast.error(ex.message, 'Não foi possível obter os dados');
                } finally {
                    this.loading = false;
                    this.modal.close();
                }
            }
        );
    }

    public async move(direction: string) {
        this.filter.minDate = DateUtil.addDays(this.filter.minDate, direction === 'forward' ? 7 : -7);
        this.filter.maxDate = DateUtil.addDays(this.filter.maxDate, direction === 'forward' ? 7 : -7);
        await this.fetchData();
    }

    private setBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Painel do Vendedor`,
                route: undefined
            }
        ];
    }
}
