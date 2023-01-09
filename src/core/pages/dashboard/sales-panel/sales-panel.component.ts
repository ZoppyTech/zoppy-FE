import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '@ZoppyTech/toast';
import { environment } from 'src/environments/environment';
import { Modal, ModalService } from 'src/shared/components/modal/modal.service';
import { SalesPanelContactRequest } from 'src/shared/components/modal/sales-panel-contact/sales-panel-contact.request';
import { MessageConfigConstants, MessageConfigTemplate } from 'src/shared/constants/message-config.constants';
import { TaskConstants, TaskContactTypes } from 'src/shared/constants/task.constants';
import { TaskEntity } from 'src/shared/models/entities/task.entity';
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
import { MatrixRfmUtil } from 'src/shared/utils/matrix-rfm.util';
import { Navigation } from 'src/shared/utils/navigation';
import { TaskUtil } from 'src/shared/utils/task.util';
import { Day, SalesPanelMapper } from './sales-panel.mapper';

@Component({
    selector: 'app-sales-panel',
    templateUrl: './sales-panel.component.html',
    styleUrls: ['./sales-panel.component.scss']
})
export class SalesPanelComponent implements OnInit {
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
        public breadcrumb: BreadcrumbService
    ) {}

    public async ngOnInit() {
        this.sideMenuService.change('salesPanel');
        this.setBreadcrumb();
        const firstAndlastDay: FirstAndLastDayOfWeek = DateUtil.getFirstAndLastDayOfCurrentWeek();
        this.filter.maxDate = firstAndlastDay.lastday;
        this.filter.minDate = firstAndlastDay.firstday;
        this.filter.maxDate.setHours(23, 59, 59);
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
        task.loading = true;
        try {
            let message: MessageConfigTemplate = TaskUtil.getMessageTemplate(task.type);
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

    public async call(task: TaskView): Promise<void> {
        window.open(`tel:+55${task.customer.address.phone}`, '_self');
    }

    public getTaskIsConcluded(task: TaskView): boolean {
        return TaskUtil.getTaskIsConcluded(task);
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
                this.toast.error(ex.message, 'Não foi possível obter os dados');
            } finally {
                this.loading = false;
                this.modal.close();
            }
        });
    }

    public async move(direction: string) {
        this.filter.minDate = DateUtil.addDays(this.filter.minDate, direction === 'forward' ? 7 : -7);
        this.filter.maxDate = DateUtil.addDays(this.filter.maxDate, direction === 'forward' ? 7 : -7);
        this.filter.maxDate.setHours(23, 59, 59);
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
