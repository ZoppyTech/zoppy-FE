import { Pallete, VisualIdentityService } from '@lucarrloliveira/visual-identity';

export class StyleUtil {
    public static setBaseColorPallete(visualIdentityService: VisualIdentityService): void {
        const neutral: Pallete = new Pallete(
            '#363636',
            '#4b4b4b',
            '#727272',
            '#9b9b9b',
            '#c6c6c6',
            '#dddddd',
            '#f3f3f3',
            '#ffffff',
            '#ffffff'
        );
        const primary: Pallete = new Pallete(
            '#13357b',
            '#2f4790',
            '#4759a5',
            '#5d6dbb',
            '#7381d2',
            '#a0aaff',
            '#b6c0ff',
            '#cdd6ff',
            '#002e73'
        );
        const secondary: Pallete = new Pallete(
            '#4e14d8',
            '#6a2eef',
            '#8344ff',
            '#9d5aff',
            '#b670ff',
            '#cf85ff',
            '#e79bff',
            '#ffb2ff',
            '#7b3dff'
        );
        const tertiary: Pallete = new Pallete(
            '#004374',
            '#00568e',
            '#0069a4',
            '#007dba',
            '#0092d0',
            '#00a7e7',
            '#49d3ff',
            '#68e9ff',
            '#1fbeff'
        );
        const quaternary: Pallete = new Pallete(
            '#00493b',
            '#005d4d',
            '#007260',
            '#008774',
            '#009d88',
            '#00b39d',
            '#00cab3',
            '#00e0c9',
            '#00ffe6'
        );

        const negative: string = '#eb0000';
        const warning: string = '#ffad4e';
        const info: string = '#4c7eff';
        const success: string = '#30e1a1';

        visualIdentityService.setVariables(neutral, primary, secondary, tertiary, quaternary, success, info, warning, negative);
    }
}
