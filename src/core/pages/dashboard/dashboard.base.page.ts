import { CompanyEntity } from 'src/shared/models/entities/company.entity';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { CompanyUtil } from 'src/shared/utils/company.util';
import { Storage } from 'src/shared/utils/storage';
import { UserUtil } from 'src/shared/utils/User.util';

export class DashboardBasePage {
    public isAdmin: boolean = false;
    public isMaster: boolean = false;
    public isPremium: boolean = false;
    public isStandard: boolean = false;

    public constructor(public storage: Storage) {
        this.isAdmin = UserUtil.isAdmin(storage.getUser() as UserEntity);
        this.isMaster = UserUtil.isMaster(storage.getUser() as UserEntity);
        this.isPremium = CompanyUtil.isPremium(storage.getCompany() as CompanyEntity);
        this.isStandard = CompanyUtil.isStandard(storage.getCompany() as CompanyEntity);
    }
}
