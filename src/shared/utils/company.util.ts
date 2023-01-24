import { AppConstants } from '../constants/app.constants';
import { CompanyEntity } from '../models/entities/company.entity';

export class CompanyUtil {
    public static isStandard(company: CompanyEntity | undefined): boolean {
        if (!company) return false;
        return company.plan === AppConstants.Plan.standard;
    }

    public static isPremium(company: CompanyEntity | undefined): boolean {
        if (!company) return false;
        return company.plan === AppConstants.Plan.premium;
    }

    public static isShopify(company: CompanyEntity | undefined): boolean {
        if (!company) return false;
        return company.provider === AppConstants.Providers.shopify;
    }

    public static isNuvemshop(company: CompanyEntity | undefined): boolean {
        if (!company) return false;
        return company.provider === AppConstants.Providers.nuvemshop;
    }

    public static isWooCommerce(company: CompanyEntity | undefined): boolean {
        if (!company) return false;
        return company.provider === AppConstants.Providers.wooCommerce;
    }

    public static isTray(company: CompanyEntity | undefined): boolean {
        if (!company) return false;
        return company.provider === AppConstants.Providers.tray;
    }
}
