import { Component, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { TaskConstants } from '@ZoppyTech/utilities';
import { TaskEntity } from 'src/shared/models/entities/task.entity';
import { ZoppyFilter } from 'src/shared/models/filter';
import { SocialMediaRequest } from 'src/shared/models/requests/social-media/social-media.request';
import { CrmAddressResponse } from 'src/shared/models/responses/crm/crm-address.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { CrmAddressService } from 'src/shared/services/crm-address/crm-address.service';
import { SocialMediaService } from 'src/shared/services/social-media/social-media.service';
import { ModalService } from '../modal.service';

@Component({
    selector: 'new-task',
    templateUrl: './new-task.component.html',
    styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
    public customers: Array<CrmAddressResponse> = [];
    public filter: ZoppyFilter<CrmAddressResponse> = new ZoppyFilter<CrmAddressResponse>();
    public task: TaskEntity = new TaskEntity();
    public hasCustomer: boolean = false;
    public loading: boolean = false;
    public loadedInfo: boolean = false;
    public searchText: string = '';
    public types: Array<Item> = [
        {
            label: 'Pós-venda',
            value: TaskConstants.TYPES.AFTER_SALE
        },
        {
            label: 'Entrar em Contato',
            value: TaskConstants.TYPES.CONTACT
        }
    ];

    public constructor(
        public crmAddressService: CrmAddressService,
        public toast: ToastService,
        public modal: ModalService,
        private readonly socialMediaService: SocialMediaService
    ) {}

    public async ngOnInit() {
        this.task.scheduledDate = this.modal.data.scheduledDate;
        this.task.type = TaskConstants.TYPES.CONTACT;
        await this.fetchData();
        this.loadedInfo = true;
    }

    public async fetchData(): Promise<void> {
        try {
            this.filter.searchText = this.searchText;
            this.filter.searchFields = ['firstName', 'lastName', 'phone'];
            const response: ZoppyFilter<CrmAddressResponse> = await this.crmAddressService.findAllPaginated(this.filter);
            response.data = response.data.map((address: CrmAddressResponse) => {
                address.fullName = `${address.firstName} ${address.lastName ?? ''}`;
                return address;
            });
            this.filter.pagination = response.pagination;
            this.customers = (response.data as CrmAddressResponse[]) ?? [];
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter os clientes');
        }
    }

    public async onSearchTextChanged(searchText: string): Promise<void> {
        this.searchText = searchText;
        await this.fetchData();
    }

    public async addTask(): Promise<void> {
        this.loading = true;
        const request: SocialMediaRequest = {
            taskType: this.task.type,
            description: this.task.description,
            scheduledDate: this.task.scheduledDate,
            status: TaskConstants.STATUS.NONE
        };

        try {
            await this.socialMediaService.create(this.task.customerId, request);
            setTimeout(async () => {
                await this.fetchData();
                this.toast.success('Tarefa concluída', 'Sucesso');
            });
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi salvar a tarefa');
        } finally {
            this.loading = false;
            await this.modal.callback();
            this.modal.close();
        }
    }
}

interface Item {
    label: string;
    value: string;
}
