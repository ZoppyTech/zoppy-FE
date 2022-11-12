import { AppConstants } from '../constants/app.constants';
import { UserEntity } from '../models/entities/user.entity';

export class UserUtil {
    public static isAdmin(user: UserEntity | undefined): boolean {
        if (!user) return false;
        return user.role === AppConstants.ROLES.ADMIN;
    }

    public static isMaster(user: UserEntity | undefined): boolean {
        if (!user) return false;
        return user.role === AppConstants.ROLES.MASTER;
    }
}
