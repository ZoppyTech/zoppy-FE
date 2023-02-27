import { AppConstants, UserUtil } from '@ZoppyTech/utilities';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { SideMenuItem } from 'src/shared/services/side-menu/side-menu.service';
import { Navigation } from 'src/shared/utils/navigation';

export class ConfigAccountItems {
    public static get(user: UserEntity): Array<SideMenuItem> {
        return [
            {
                id: `myProfile`,
                icon: 'icon-user',
                label: 'Dados Pessoais',
                route: Navigation.routes.profile,
                visible: true
            },
            {
                id: `myCompanyConfig`,
                icon: 'icon-corporate_fare',
                label: 'Empresa',
                route: Navigation.routes.myCompanyConfig,
                visible: UserUtil.hasRoles(user, [AppConstants.ROLES.ADMIN, AppConstants.ROLES.MASTER])
            },
            {
                id: `myCompanyUsers`,
                icon: 'icon-group_add',
                label: 'Usuários',
                route: Navigation.routes.myCompanyUsers,
                visible: UserUtil.hasRoles(user, [AppConstants.ROLES.ADMIN, AppConstants.ROLES.MASTER])
            },
            {
                id: `signature`,
                icon: 'icon-credit_card',
                label: 'Assinature',
                route: Navigation.routes.signature,
                visible: UserUtil.hasRoles(user, [AppConstants.ROLES.ADMIN, AppConstants.ROLES.MASTER])
            },
            {
                id: `changePassword`,
                icon: 'icon-lock',
                label: 'Redefinir senha',
                route: Navigation.routes.changePassword,
                visible: true
            }
        ];
    }
}
