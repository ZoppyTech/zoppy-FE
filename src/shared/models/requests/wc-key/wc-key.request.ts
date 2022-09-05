import { WcKeyEntity } from '../../entities/wc-key.entity';

export interface wcKeyRequest {
    id?: string;
    key?: string | number;
    secret?: string | number;
    url?: string | number;
    keyVisible?: boolean;
    secretVisible?: boolean;
}
