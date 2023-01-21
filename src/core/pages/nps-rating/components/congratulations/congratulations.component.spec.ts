import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongratulationsComponent } from './congratulations.component';

describe('CongratulationsComponent', () => {
    let component: CongratulationsComponent;
    let fixture: ComponentFixture<CongratulationsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CongratulationsComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(CongratulationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
