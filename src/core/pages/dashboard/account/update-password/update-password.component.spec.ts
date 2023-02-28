import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UpdatePasswordComponent } from './update-password.component';

describe('UpdatePasswordComponent', () => {
    let component: UpdatePasswordComponent;
    let fixture: ComponentFixture<UpdatePasswordComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UpdatePasswordComponent],
            imports: [HttpClientTestingModule, RouterTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(UpdatePasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
