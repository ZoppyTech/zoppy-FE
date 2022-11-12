export class Navigation {
    public static routes: Record<Pages, string> = {
        login: '/login',
        landing: '/landing',
        changePassword: '/change-password',
        resetPassword: '/reset-password',
        dashboard: '/dashboard',
        home: '/dashboard/home',
        register: '/register',
        configuration: '/dashboard/configurations',
        profile: '/dashboard/profile',
        myCompany: '/dashboard/my-company',
        myCompanyConfig: '/dashboard/my-company/config',
        myCompanyUsers: '/dashboard/my-company/users',
        userConfig: '/dashboard/my-company/users/config',
        reports: '/dashboard/reports',
        accessKeys: '/dashboard/configurations/access-keys',
        accessTokens: '/dashboard/configurations/access-tokens',
        letalk: '/dashboard/configurations/letalk',
        giftback: '/dashboard/configurations/giftback',
        whatsappConfig: '/dashboard/configurations/whatsapp-setup',
        whatsappTemplateList: '/dashboard/configurations/whatsapp-template-list',
        syncData: '/dashboard/configurations/sync-data',
        whatsapp: '/dashboard/whatsapp',
        products: '/dashboard/products',
        sales: '/dashboard/sales',
        customers: '/dashboard/customers'
    };
}

export type Pages =
    | 'login'
    | 'landing'
    | 'changePassword'
    | 'resetPassword'
    | 'dashboard'
    | 'home'
    | 'register'
    | `configuration`
    | 'profile'
    | 'myCompany'
    | 'myCompanyConfig'
    | 'myCompanyUsers'
    | 'userConfig'
    | 'reports'
    | 'accessKeys'
    | 'accessTokens'
    | 'letalk'
    | 'giftback'
    | 'whatsappConfig'
    | 'whatsappTemplateList'
    | 'syncData'
    | 'whatsapp'
    | 'products'
    | 'sales'
    | 'customers';
