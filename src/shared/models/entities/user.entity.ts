export class UserEntity {
    public declare id: string;
    public declare name: string;
    public declare userName: string;
    public declare email: string;
    public declare password: string;
    public declare role: string;
    public declare phone: string;
    public declare loginDate: Date;
    public declare birthDate: Date;
    public declare createdAt: Date;
    public declare updatedAt: Date | null;
    public declare deletedAt: Date | null;
    public declare companyId: string;
}
