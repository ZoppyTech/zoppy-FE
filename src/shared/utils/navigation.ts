export class Navigation {
    public static routes: Record<Pages, string> = {
        login: '/login',
        landing: '/landing',
        resetPassword: '/reset-password',
        dashboard: '/dashboard',
        home: '/dashboard/home',
        register: '/register',
        configuration: '/dashboard/configurations',
        account: '/dashboard/account',
        changePassword: 'change-password',
        updatePassword: '/dashboard/account/change-password',
        profile: '/dashboard/account/profile',
        signature: '/dashboard/account/signature',
        myCompany: '/dashboard/account/my-company',
        myCompanyConfig: '/dashboard/account/my-company/config',
        myCompanyUsers: '/dashboard/account/my-company/users',
        userConfig: '/dashboard/account/my-company/users/config',
        reports: '/dashboard/reports',
        accessKeys: '/dashboard/configurations/access-keys',
        accessTokens: '/dashboard/access-tokens',
        letalk: '/dashboard/configurations/letalk',
        messageConfig: '/dashboard/configurations/message-config',
        messageTemplate: '/dashboard/configurations/message-template',
        messageTemplateList: '/dashboard/configurations/message-template/list',
        messageTemplateConfig: '/dashboard/configurations/message-template/config',
        giftback: '/dashboard/configurations/giftback',
        coupons: '/dashboard/configurations/coupons',
        batchUpload: '/dashboard/configurations/batch-upload',
        whatsappConfig: '/dashboard/configurations/whatsapp-setup',
        whatsappTemplateList: '/dashboard/configurations/whatsapp-template-list',
        syncData: '/dashboard/configurations/sync-data',
        integrations: '/dashboard/configurations/integrations ',
        automations: '/dashboard/configurations/automations ',
        whatsapp: '/dashboard/whatsapp',
        products: '/dashboard/products',
        product: '/dashboard/products/add',
        sales: '/dashboard/sales',
        salesPanel: '/dashboard/sales-panel',
        customers: '/dashboard/customers',
        customer: '/dashboard/customers/add',
        customerSocialMedia: '/dashboard/customers/details'
    };
}

export type Pages =
    | 'accessKeys'
    | 'accessTokens'
    | 'account'
    | 'batchUpload'
    | 'changePassword'
    | 'coupons'
    | 'customer'
    | 'customers'
    | 'customerSocialMedia'
    | 'dashboard'
    | 'giftback'
    | 'home'
    | 'landing'
    | 'letalk'
    | 'login'
    | 'messageConfig'
    | 'messageTemplate'
    | 'messageTemplateList'
    | 'messageTemplateConfig'
    | 'myCompany'
    | 'myCompanyConfig'
    | 'myCompanyUsers'
    | 'product'
    | 'products'
    | 'profile'
    | 'register'
    | 'reports'
    | 'resetPassword'
    | 'sales'
    | 'salesPanel'
    | 'signature'
    | 'syncData'
    | 'updatePassword'
    | 'userConfig'
    | 'whatsapp'
    | 'whatsappConfig'
    | 'whatsappTemplateList'
    | `configuration`
    | 'integrations'
    | 'automations';
