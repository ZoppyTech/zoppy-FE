import { AppConstants } from '@ZoppyTech/utilities';
import { CompanyEntity } from '../models/entities/company.entity';

export class CompanyUtil {
    public static isStandard(company: CompanyEntity | undefined): boolean {
        if (!company) return false;
        return company.plan === AppConstants.PLANS.STANDARD;
    }

    public static isPremium(company: CompanyEntity | undefined): boolean {
        if (!company) return false;
        return company.plan === AppConstants.PLANS.PREMIUM;
    }

    public static isShopify(company: CompanyEntity | undefined): boolean {
        if (!company) return false;
        return company.provider === AppConstants.PROVIDERS.SHOPIFY;
    }

    public static isNuvemshop(company: CompanyEntity | undefined): boolean {
        if (!company) return false;
        return company.provider === AppConstants.PROVIDERS.NUVEMSHOP;
    }

    public static isWooCommerce(company: CompanyEntity | undefined): boolean {
        if (!company) return false;
        return company.provider === AppConstants.PROVIDERS.WOO_COMMERCE;
    }

    public static isTray(company: CompanyEntity | undefined): boolean {
        if (!company) return false;
        return company.provider === AppConstants.PROVIDERS.TRAY;
    }
}
