import { CompanyEntity } from 'src/shared/models/entities/company.entity';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { CompanyUtil } from 'src/shared/utils/company.util';
import { Storage } from 'src/shared/utils/storage';
import { UserUtil } from 'src/shared/utils/user.util';

export class DashboardBasePage {
    public isAdmin: boolean = false;
    public isMaster: boolean = false;

    public isPremium: boolean = false;
    public isStandard: boolean = false;

    public isShopify: boolean = false;
    public isWooCommerce: boolean = false;

    public constructor(public storage: Storage) {
        this.isAdmin = UserUtil.isAdmin(storage.getUser() as UserEntity);
        this.isMaster = UserUtil.isMaster(storage.getUser() as UserEntity);

        this.isPremium = CompanyUtil.isPremium(storage.getCompany() as CompanyEntity);
        this.isStandard = CompanyUtil.isStandard(storage.getCompany() as CompanyEntity);

        this.isShopify = CompanyUtil.isShopify(storage.getCompany() as CompanyEntity);
        this.isWooCommerce = CompanyUtil.isWooCommerce(storage.getCompany() as CompanyEntity);
    }

    public getIsAdmin(): boolean {
        return UserUtil.isAdmin(this.storage?.getUser() as UserEntity);
    }

    public getIsMaster(): boolean {
        return UserUtil.isMaster(this.storage?.getUser() as UserEntity);
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

    public getIsWooCommerce(): boolean {
        return CompanyUtil.isWooCommerce(this.storage?.getCompany() as CompanyEntity);
    }
}
