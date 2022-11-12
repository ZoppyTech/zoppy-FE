import { AppConstants } from '../constants/app.constants';
import { CompanyEntity } from '../models/entities/company.entity';
import { UserEntity } from '../models/entities/user.entity';

export class UserUtil {
    public static isAdmin(user: UserEntity | undefined): boolean {
        if (!user) return false;
        return user.role === AppConstants.Role.admin;
    }

    public static isMaster(user: UserEntity | undefined): boolean {
        if (!user) return false;
        return user.role === AppConstants.Role.master;
    }
}
