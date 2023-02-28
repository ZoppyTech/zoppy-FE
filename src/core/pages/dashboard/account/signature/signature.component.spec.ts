import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SignatureComponent } from './signature.component';

describe('SignatureComponent', () => {
    let component: SignatureComponent;
    let fixture: ComponentFixture<SignatureComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SignatureComponent],
            imports: [HttpClientTestingModule, RouterTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(SignatureComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
