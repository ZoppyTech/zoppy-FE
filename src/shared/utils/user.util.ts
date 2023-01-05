import { AppConstants } from '../constants/app.constants';
import { UserEntity } from '../models/entities/user.entity';

export class UserUtil {
    public static isAdmin(user: UserEntity | undefined): boolean {
        if (!user) return false;
        return user.role === AppConstants.Role.admin;
    }

    public static isManager(user: UserEntity | undefined): boolean {
        if (!user) return false;
        return user.role === AppConstants.Role.manager;
    }

    public static isCommon(user: UserEntity | undefined): boolean {
        if (!user) return false;
        return user.role === AppConstants.Role.common;
    }

    public static isMaster(user: UserEntity | undefined): boolean {
        if (!user) return false;
        return user.role === AppConstants.Role.master;
    }

    public static hasRoles(user: UserEntity | undefined, roles: string[]): boolean {
        return roles.includes(user?.role ?? '');
    }
}
