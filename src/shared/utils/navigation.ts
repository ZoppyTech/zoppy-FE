export class Navigation {
    public static routes: Record<Pages, string> = {
        login: '/login',
        landing: '/landing',
        resetPassword: '/reset-password',
        dashboard: '/dashboard',
        home: '/dashboard/home',
        register: '/register',
        blocked: '/blocked',
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
        coupons: '/dashboard/configurations/coupons',

        integrations: '/dashboard/configurations/integrations ',
        automations: '/dashboard/configurations/automations ',
        automationForm: '/dashboard/configurations/automations/form',
        messageTemplate: '/dashboard/configurations/templates',
        messageTemplateList: '/dashboard/configurations/templates/list',
        messageTemplateConfig: '/dashboard/configurations/templates/config',
        whatsappConfig: '/dashboard/configurations/whatsapp-setup',
        syncData: '/dashboard/configurations/sync-data',
        giftback: '/dashboard/configurations/giftbacks',
        batchUpload: '/dashboard/configurations/batch-upload',
        campaign: '/dashboard/configurations/campaigns',
        campaignList: '/dashboard/configurations/campaigns/list',
        campaignConfig: '/dashboard/configurations/campaigns/config',

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
    | 'campaign'
    | 'campaignList'
    | 'campaignConfig'
    | 'blocked'
    | 'changePassword'
    | 'coupons'
    | 'customer'
    | 'customers'
    | 'customerSocialMedia'
    | 'dashboard'
    | 'giftback'
    | 'home'
    | 'landing'
    | 'login'
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
    | `configuration`
    | 'integrations'
    | 'automations'
    | 'automationForm';
