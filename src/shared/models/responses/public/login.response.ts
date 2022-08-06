import { CompanyEntity } from '../../entities/company.entity';
import { UserEntity } from '../../entities/user.entity';

export class LoginResponse {
    public token: string = '';
    public user?: UserEntity = undefined;
    public company?: CompanyEntity = undefined;
}
