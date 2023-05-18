import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '@ZoppyTech/toast';
import { TaskContactTypes, TaskConstants, MatrixRfmUtil, DateUtil, FirstAndLastDayOfWeek, TaskStatus } from '@ZoppyTech/utilities';
import { environment } from 'src/environments/environment';
import { Modal, ModalService } from 'src/shared/components/modal/modal.service';
import { SalesPanelContactRequest } from 'src/shared/components/modal/sales-panel-contact/sales-panel-contact.request';
import { TaskEntity } from 'src/shared/models/entities/task.entity';
import { SalesPanelRequest } from 'src/shared/models/requests/social-media/sales-panel.request';
import { SocialMediaRequest } from 'src/shared/models/requests/social-media/social-media.request';
import { CrmCustomerLinkResponse } from 'src/shared/models/responses/crm/crm-customer-link.response';
import { SocialMediaSalesPanelResponse, TaskView } from 'src/shared/models/responses/social-media/social-media-sales-panel.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { CrmCustomerService } from 'src/shared/services/crm-customer/crm-customer.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { SocialMediaService } from 'src/shared/services/social-media/social-media.service';
import { Storage } from 'src/shared/utils/storage';
import { TaskUtil } from 'src/shared/utils/task.util';
import { DashboardBasePage } from '../dashboard.base.page';
import { Day, SalesPanelMapper } from './sales-panel.mapper';

@Component({
    selector: 'app-sales-panel',
    templateUrl: './sales-panel.component.html',
    styleUrls: ['./sales-panel.component.scss']
})
export class SalesPanelComponent extends DashboardBasePage implements OnInit {
    public days: Day[] = [];
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
        public breadcrumb: BreadcrumbService,
        public override storage: Storage
    ) {
        super(storage);
    }

    public async ngOnInit() {
        this.sideMenuService.change('salesPanel');
        this.setBreadcrumb();
        this.initFilter();
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
            this.days = SalesPanelMapper.mapDays(salesPanel.tasks, this.filter, this.isMobile);
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

    public getPosition(task: TaskView): string {
        return MatrixRfmUtil.getLabel(task.customer?.position) ?? 'vazio';
    }

    public async sendWppMessage(task: TaskView): Promise<void> {
        task.loadingWpp = true;
        try {
            const data: CrmCustomerLinkResponse = await this.crmCustomerService.findWhatsappLink({
                customerId: task.customer.id,
                linkTemplateId: task.type,
                taskId: task.id
            });
            window
                ?.open(`https://api.whatsapp.com/send/?phone=${data.phoneNumber}&text=${encodeURIComponent(data.text)}`, '_blank')
                ?.focus();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Houve um erro');
        } finally {
            task.loadingWpp = false;
        }
    }

    public async call(task: TaskView): Promise<void> {
        window.open(`tel:+55${task.customer.address.phone}`, '_self');
    }

    public getTaskIsConcluded(task: TaskView): boolean {
        return TaskUtil.getTaskIsConcluded(task);
    }

    public async addTask(day: Day): Promise<void> {
        this.modal.open(
            Modal.IDENTIFIER.NEW_TASK,
            {
                scheduledDate: day.date
            },
            async () => {
                await this.fetchData();
            }
        );
    }

    public async openTaskDescriptionModal(task: TaskView, contactType: TaskContactTypes): Promise<void> {
        if (TaskUtil.getTaskIsConcluded(task)) {
            this.toast.alert('Tarefa já concluída', 'Atenção');
            return;
        }
        if (contactType === TaskConstants.CONTACT_TYPES.WHATSAPP) await this.sendWppMessage(task);
        else if (contactType === TaskConstants.CONTACT_TYPES.CALL) await this.call(task);

        const contactRequest: SalesPanelContactRequest = {
            icon: 'icon-wpp',
            title: 'Registro de atividade',
            subtitle: `A Zoppy quer saber se você conseguiu efetuar o contato com o(a) ${task.customer?.address?.firstName} para podermos registrar em seu histórico?`,
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
                taskType: task.type,
                description: response.description.value,
                contactType: response.contactType.response as any,
                status: response.statusType.response as any
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
                this.toast.error(ex.message, 'Não foi salvar a tarefa');
            } finally {
                this.loading = false;
                this.modal.close();
            }
        });
    }

    public async move(direction: string) {
        const days: number = this.isMobile ? 1 : 7;
        this.filter.minDate = DateUtil.addDays(this.filter.minDate, direction === 'forward' ? days : -days);
        this.filter.maxDate = DateUtil.addDays(this.filter.maxDate, direction === 'forward' ? days : -days);
        this.filter.maxDate.setHours(23, 59, 59);
        await this.fetchData();
    }

    public getStatusLabel(task: TaskEntity): string {
        return TaskUtil.getStatusLabel(task.status as TaskStatus);
    }

    public getStatusLabelExplanation(task: TaskEntity): string {
        return TaskUtil.getStatusLabelExplanation(task.status as TaskStatus);
    }

    private setBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Painel do Vendedor`,
                route: undefined
            }
        ];
    }

    private initFilter(): void {
        if (this.isMobile) {
            this.filter.maxDate = new Date();
            this.filter.minDate = new Date();
        } else {
            const firstAndlastDay: FirstAndLastDayOfWeek = DateUtil.getFirstAndLastDayOfCurrentWeek();
            this.filter.maxDate = firstAndlastDay.lastday;
            this.filter.minDate = firstAndlastDay.firstday;
        }
        this.filter.minDate.setHours(0, 0, 0);
        this.filter.maxDate.setHours(23, 59, 59);
    }
}
