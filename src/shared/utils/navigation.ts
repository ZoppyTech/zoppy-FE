export class Navigation {
    public static routes: Record<Pages, string> = {
        login: '/login',
        landing: '/landing',
        'change-password': '/change-password',
        'reset-password': '/reset-password',
        dashboard: '/dashboard',
        register: '/register',
        configuration: 'dashboard/configuration',
        profile: 'dashboard/profile',
        'my-company': 'dashboard/my-company',
        'my-company-config': 'dashboard/my-company/config',
        'my-company-users': 'dashboard/my-company/users',
        'user-config': 'dashboard/my-company/users/config',
        reports: 'dashboard/reports',
        'access-keys': 'dashboard/configurations/access-keys',
        'access-tokens': 'dashboard/configurations/access-tokens',
        giftback: 'dashboard/configurations/giftback',
        'sync-data': 'dashboard/configurations/sync-data'
    };
}

export type Pages =
    | 'login'
    | 'landing'
    | 'change-password'
    | 'reset-password'
    | 'dashboard'
    | 'register'
    | `configuration`
    | 'profile'
    | 'my-company'
    | 'my-company-config'
    | 'my-company-users'
    | 'user-config'
    | 'reports'
    | 'access-keys'
    | 'access-tokens'
    | 'giftback'
    | 'sync-data';
