import { AppConstants } from '@ZoppyTech/utilities';
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
                id: `accessKeys`,
                icon: 'icon-arrow',
                label: 'Chaves de Acesso',
                route: Navigation.routes.accessKeys,
                visible: UserUtil.hasRoles(user, [AppConstants.ROLES.ADMIN, AppConstants.ROLES.MASTER])
            },
            {
                id: `giftback`,
                icon: 'icon-arrow',
                label: 'Configuração de Giftback',
                route: Navigation.routes.giftback,
                visible: UserUtil.hasRoles(user, [AppConstants.ROLES.ADMIN, AppConstants.ROLES.MASTER, AppConstants.ROLES.MANAGER])
            },
            {
                id: `syncData`,
                icon: 'icon-arrow',
                label: 'Sincronização',
                route: Navigation.routes.syncData,
                visible: UserUtil.hasRoles(user, [AppConstants.ROLES.ADMIN, AppConstants.ROLES.MASTER])
            },
            {
                id: `messageTemplate`,
                icon: 'icon-arrow',
                label: 'Modelos de Mensagem',
                route: Navigation.routes.messageTemplate,
                visible: UserUtil.hasRoles(user, [AppConstants.ROLES.ADMIN, AppConstants.ROLES.MASTER, AppConstants.ROLES.MANAGER])
            },
            {
                id: `whatsappConfig`,
                icon: 'icon-arrow',
                label: 'Configuração do Whatsapp',
                route: Navigation.routes.whatsappConfig,
                visible: UserUtil.isMaster(user) && !CompanyUtil.isTray(company) && CompanyUtil.isPremium(company)
            },
            {
                id: `coupons`,
                icon: 'icon-arrow',
                label: 'Visualização de giftbacks',
                route: Navigation.routes.coupons,
                visible: UserUtil.hasRoles(user, [AppConstants.ROLES.ADMIN, AppConstants.ROLES.MASTER])
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

    public static getNewConfig(user: UserEntity, company: CompanyEntity): Array<SideMenuItem> {
        return [
            {
                id: `integrations`,
                icon: 'icon-arrow',
                label: 'Integrações',
                route: Navigation.routes.integrations,
                visible: UserUtil.hasRoles(user, [AppConstants.ROLES.ADMIN, AppConstants.ROLES.MASTER, AppConstants.ROLES.MANAGER])
            },
            {
                id: `automations`,
                icon: 'icon-arrow',
                label: 'Automações',
                route: Navigation.routes.automations,
                visible: UserUtil.hasRoles(user, [AppConstants.ROLES.ADMIN, AppConstants.ROLES.MASTER, AppConstants.ROLES.MANAGER])
            },
            {
                id: `coupons`,
                icon: 'icon-arrow',
                label: 'Visualização de Giftbacks',
                route: Navigation.routes.giftback,
                visible: UserUtil.hasRoles(user, [AppConstants.ROLES.ADMIN, AppConstants.ROLES.MASTER, AppConstants.ROLES.MANAGER])
            },
            {
                id: `messageTemplate`,
                icon: 'icon-arrow',
                label: 'Templates de Mensagens',
                route: Navigation.routes.messageTemplate,
                visible: UserUtil.hasRoles(user, [AppConstants.ROLES.ADMIN, AppConstants.ROLES.MASTER, AppConstants.ROLES.MANAGER])
            },
            {
                id: `campaigns`,
                icon: 'icon-arrow',
                label: 'Campanhas',
                route: Navigation.routes.campaign,
                visible:
                    CompanyUtil.isPremium(company) &&
                    UserUtil.hasRoles(user, [AppConstants.ROLES.ADMIN, AppConstants.ROLES.MASTER, AppConstants.ROLES.MANAGER])
            },
            {
                id: `whatsappConfig`,
                icon: 'icon-arrow',
                label: 'Configuração do Whatsapp',
                route: Navigation.routes.whatsappConfig,
                visible: UserUtil.hasRoles(user, [AppConstants.ROLES.MASTER]) && !CompanyUtil.isTray(company)
            },
            {
                id: 'batchUpload',
                icon: 'icon-arrow',
                label: 'Upload de Planilhas',
                route: Navigation.routes.batchUpload,
                visible: UserUtil.hasRoles(user, [AppConstants.ROLES.MASTER])
            },
            {
                id: 'syncData',
                icon: 'icon-arrow',
                label: 'Sincronização de dados',
                route: Navigation.routes.syncData,
                visible: UserUtil.hasRoles(user, [AppConstants.ROLES.MASTER])
            }
        ];
    }
}
