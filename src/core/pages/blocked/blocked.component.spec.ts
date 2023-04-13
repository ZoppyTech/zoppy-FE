import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedComponent } from './blocked.component';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CarrosselModule } from 'src/shared/components/carrossel/carrossel.module';

describe('BlockedComponent', () => {
    let component: BlockedComponent;
    let fixture: ComponentFixture<BlockedComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BlockedComponent],
            imports: [RouterTestingModule, HttpClientTestingModule, IconModule, ButtonModule, InputModule, CarrosselModule]
        }).compileComponents();

        fixture = TestBed.createComponent(BlockedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
