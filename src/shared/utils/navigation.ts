export class Navigation {
    public static routes: Record<Pages, string> = {
        login: '/login',
        landing: '/landing',
        'change-password': '/change-password',
        'reset-password': '/reset-password',
        dashboard: '/dashboard',
        register: '/register'
    };
}

export type Pages = 'login' | 'landing' | 'change-password' | 'reset-password' | 'dashboard' | 'register';
