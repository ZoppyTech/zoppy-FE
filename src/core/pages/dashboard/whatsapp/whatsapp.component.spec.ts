import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { WhatsappComponent } from './whatsapp.component';

describe('WhatsappComponent', () => {
    let component: WhatsappComponent;
    let fixture: ComponentFixture<WhatsappComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WhatsappComponent],
            imports: [HttpClientTestingModule, RouterTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(WhatsappComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WhatsappComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
