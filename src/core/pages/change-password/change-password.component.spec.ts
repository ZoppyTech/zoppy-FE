/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangePasswordComponent } from './change-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonModule } from '@lucarrloliveira/button';
import { IconModule } from '@lucarrloliveira/icon';
import { InputModule } from '@lucarrloliveira/input';
import { ToastService } from '@lucarrloliveira/toast';
import { CarrosselModule } from 'src/shared/components/carrossel/carrossel.module';

describe('ChangePasswordComponent', () => {
    let component: ChangePasswordComponent;
    let fixture: ComponentFixture<ChangePasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChangePasswordComponent],
            imports: [RouterTestingModule, HttpClientTestingModule, IconModule, ButtonModule, InputModule, CarrosselModule],
            providers: [ToastService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangePasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
