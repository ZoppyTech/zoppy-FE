import { MessageTemplateComponent } from './message-template.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InputModule } from '@ZoppyTech/input';
import { ButtonModule } from '@ZoppyTech/button';

const routes: Routes = [
    {
        path: '',
        component: MessageTemplateComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list'
            },
            {
                path: 'config',
                loadChildren: () =>
                    import('./message-template-config/message-template-config.module').then((m: any) => m.MessageTemplateConfigModule)
            },
            {
                path: 'config/:id',
                loadChildren: () =>
                    import('./message-template-config/message-template-config.module').then((m: any) => m.MessageTemplateConfigModule)
            },
            {
                path: 'config/:id/:tab',
                loadChildren: () =>
                    import('./message-template-config/message-template-config.module').then((m: any) => m.MessageTemplateConfigModule)
            },
            {
                path: 'list',
                loadChildren: () =>
                    import('./message-template-list/message-template-list.module').then((m: any) => m.MessageTemplateListModule)
            }
        ]
    }
];

@NgModule({
    declarations: [MessageTemplateComponent],
    exports: [MessageTemplateComponent],
    imports: [CommonModule, RouterModule.forChild(routes), InputModule, ButtonModule]
})
export class MessageTemplateModule {}
