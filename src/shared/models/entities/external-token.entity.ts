export class ExternalTokenEntity {
    public declare id: string;
    public declare hash: string;
    public declare active: boolean;
    public declare createdAt: Date;
    public declare updatedAt: Date | null;
    public declare deletedAt: Date | null;
    public declare companyId: string;
    public declare userId: string;
}
