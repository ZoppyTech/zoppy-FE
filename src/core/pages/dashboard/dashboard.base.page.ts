import { AppConstants } from 'src/shared/constants/app.constants';
import { CompanyEntity } from 'src/shared/models/entities/company.entity';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { CompanyUtil } from 'src/shared/utils/company.util';
import { OsUtil } from 'src/shared/utils/os-util';
import { Storage } from 'src/shared/utils/storage';
import { UserUtil } from 'src/shared/utils/user.util';

export class DashboardBasePage {
    public isAdmin: boolean = false;
    public isMaster: boolean = false;
    public isManager: boolean = false;
    public isCommon: boolean = false;

    public isPremium: boolean = false;
    public isStandard: boolean = false;

    public isShopify: boolean = false;
    public isWooCommerce: boolean = false;
    public isNuvemshop: boolean = false;

    public isMobile: boolean = false;

    public constructor(public storage: Storage) {
        this.isMobile = OsUtil.getMobileOperatingSystem() !== 'unknown' || window.screen.width < 576;

        this.isAdmin = UserUtil.isAdmin(storage.getUser() as UserEntity);
        this.isMaster = UserUtil.isMaster(storage.getUser() as UserEntity);
        this.isManager = UserUtil.isManager(storage.getUser() as UserEntity);
        this.isCommon = UserUtil.isCommon(storage.getUser() as UserEntity);

        this.isPremium = CompanyUtil.isPremium(storage.getCompany() as CompanyEntity);
        this.isStandard = CompanyUtil.isStandard(storage.getCompany() as CompanyEntity);

        this.isShopify = CompanyUtil.isShopify(storage.getCompany() as CompanyEntity);
        this.isWooCommerce = CompanyUtil.isWooCommerce(storage.getCompany() as CompanyEntity);
        this.isNuvemshop = CompanyUtil.isNuvemshop(storage.getCompany() as CompanyEntity);
    }

    public getIsAdmin(): boolean {
        return UserUtil.isAdmin(this.storage?.getUser() as UserEntity);
    }

    public getIsMaster(): boolean {
        return UserUtil.isMaster(this.storage?.getUser() as UserEntity);
    }

    public getIsManager(): boolean {
        return UserUtil.isManager(this.storage?.getUser() as UserEntity);
    }

    public getIsCommon(): boolean {
        return UserUtil.isCommon(this.storage?.getUser() as UserEntity);
    }

    public getIsPremium(): boolean {
        return CompanyUtil.isPremium(this.storage?.getCompany() as CompanyEntity);
    }

    public getIsStandard(): boolean {
        return CompanyUtil.isStandard(this.storage?.getCompany() as CompanyEntity);
    }

    public getIsShopify(): boolean {
        return CompanyUtil.isShopify(this.storage?.getCompany() as CompanyEntity);
    }

    public getIsNuvemshop(): boolean {
        return CompanyUtil.isNuvemshop(this.storage?.getCompany() as CompanyEntity);
    }

    public getIsWooCommerce(): boolean {
        return CompanyUtil.isWooCommerce(this.storage?.getCompany() as CompanyEntity);
    }

    public getRoleLabel(role: string) {
        switch (role) {
            case AppConstants.Role.admin:
                return 'Administrador';
            case AppConstants.Role.master:
                return 'Master';
            case AppConstants.Role.manager:
                return 'Gerente';
            case AppConstants.Role.common:
                return 'Vendedor';
            default:
                return 'Nenhum';
        }
    }
}
