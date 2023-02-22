import { WcKeyEntity } from '../../entities/wc-key.entity';

export interface wcKeyRequest {
    id?: string;
    key?: string | number;
    secret?: string | number;
    url?: string | number;
    admin?: string;
    keyVisible?: boolean;
    adminVisible?: boolean;
    secretVisible?: boolean;
}
