import { Injectable } from '@angular/core';
import { CompanyEntity } from '../models/entities/company.entity';
import { UserEntity } from '../models/entities/user.entity';

@Injectable({
    providedIn: 'root'
})
export class Storage {
    public static keys = {
        token: 'token',
        user: 'user',
        company: 'company'
    };

    public getToken(): string | null {
        try {
            const token: string | null = localStorage.getItem(Storage.keys.token);
            return token;
        } catch (ex) {
            return null;
        }
    }

    public getUser(): UserEntity | null {
        try {
            const user: UserEntity = JSON.parse(localStorage.getItem(Storage.keys.user) as string) as UserEntity;
            return user;
        } catch (ex) {
            return null;
        }
    }

    public getCompany(): CompanyEntity | null {
        try {
            const company: CompanyEntity = JSON.parse(localStorage.getItem(Storage.keys.company) as string) as CompanyEntity;
            return company;
        } catch (ex) {
            return null;
        }
    }

    public setToken(token: string): void {
        localStorage.setItem(Storage.keys.token, token);
    }

    public setUser(user: UserEntity): void {
        localStorage.setItem(Storage.keys.user, JSON.stringify(user));
    }

    public setCompany(company: CompanyEntity): void {
        localStorage.setItem(Storage.keys.company, JSON.stringify(company));
    }

    public clearAll(): void {
        localStorage.removeItem(Storage.keys.token);
        localStorage.removeItem(Storage.keys.user);
        localStorage.removeItem(Storage.keys.company);
    }
}
