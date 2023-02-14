import { AppConstants } from '@ZoppyTech/utilities';
import { UserEntity } from '../models/entities/user.entity';

export class UserUtil {
    public static isAdmin(user: UserEntity | undefined): boolean {
        if (!user) return false;
        return user.role === AppConstants.ROLES.ADMIN;
    }

    public static isManager(user: UserEntity | undefined): boolean {
        if (!user) return false;
        return user.role === AppConstants.ROLES.MANAGER;
    }

    public static isCommon(user: UserEntity | undefined): boolean {
        if (!user) return false;
        return user.role === AppConstants.ROLES.COMMON;
    }

    public static isMaster(user: UserEntity | undefined): boolean {
        if (!user) return false;
        return user.role === AppConstants.ROLES.MASTER;
    }

    public static hasRoles(user: UserEntity | undefined, roles: string[]): boolean {
        return roles.includes(user?.role ?? '');
    }
}
