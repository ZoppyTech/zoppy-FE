import { NamePipe } from './name.pipe';

describe('Pipe: Name', () => {
    it('create an instance', () => {
        let pipe: any = new NamePipe();
        expect(pipe).toBeTruthy();
    });
});
