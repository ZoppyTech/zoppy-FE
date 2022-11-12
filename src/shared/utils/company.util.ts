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
}
