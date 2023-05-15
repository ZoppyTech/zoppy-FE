import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-empty-list',
    templateUrl: './empty-list.component.html',
    styleUrls: ['./empty-list.component.scss']
})
export class EmptyListComponent {
    @Input() public title: string = '';
    @Input() public subtitle: string = '';
}
