import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MessageTemplateConfigComponent } from './message-template-config.component';

describe('MessageTemplateConfigComponent', () => {
    let component: MessageTemplateConfigComponent;
    let fixture: ComponentFixture<MessageTemplateConfigComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MessageTemplateConfigComponent],
            imports: [HttpClientTestingModule, RouterTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(MessageTemplateConfigComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
