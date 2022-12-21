import { CompanyEntity } from 'src/shared/models/entities/company.entity';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { SideMenuItem } from 'src/shared/services/side-menu/side-menu.service';
import { CompanyUtil } from 'src/shared/utils/company.util';
import { Navigation } from 'src/shared/utils/navigation';
import { UserUtil } from 'src/shared/utils/user.util';

export class ConfigSubItems {
    public static get(user: UserEntity, company: CompanyEntity): Array<SideMenuItem> {
        return [
            {
                id: `accessTokens`,
                icon: 'icon-arrow',
                label: 'Tokens de Acesso',
                route: Navigation.routes.accessTokens,
                visible: true
            },
            {
                id: `accessKeys`,
                icon: 'icon-arrow',
                label: 'Chaves de Acesso',
                route: Navigation.routes.accessKeys,
                visible: true
            },
            {
                id: `giftback`,
                icon: 'icon-arrow',
                label: 'Configuração de Giftback',
                route: Navigation.routes.giftback,
                visible: true
            },
            {
                id: `syncData`,
                icon: 'icon-arrow',
                label: 'Sincronização',
                route: Navigation.routes.syncData,
                visible: true
            },
            {
                id: `whatsappConfig`,
                icon: 'icon-arrow',
                label: 'Configuração do Whatsapp',
                route: Navigation.routes.whatsappConfig,
                visible: UserUtil.isMaster(user)
            },
            {
                id: `whatsappTemplateList`,
                icon: 'icon-arrow',
                label: 'Modelos de Mensagem Whatsapp',
                route: Navigation.routes.whatsappTemplateList,
                visible: UserUtil.isMaster(user)
            },
            {
                id: `letalk`,
                icon: 'icon-arrow',
                label: 'Configuração da Letalk',
                route: Navigation.routes.letalk,
                visible: CompanyUtil.isStandard(company)
            },
            {
                id: `messageConfig`,
                icon: 'icon-arrow',
                label: 'Configuração de mensagens',
                route: Navigation.routes.messageConfig,
                visible: true
            },
            {
                id: `coupons`,
                icon: 'icon-arrow',
                label: 'Visualização de giftbacks',
                route: Navigation.routes.coupons,
                visible: UserUtil.isMaster(user)
            },
            {
                id: `batchUpload`,
                icon: 'icon-arrow',
                label: 'Upload de dados por planilha',
                route: Navigation.routes.batchUpload,
                visible: UserUtil.isMaster(user)
            }
        ];
    }
}