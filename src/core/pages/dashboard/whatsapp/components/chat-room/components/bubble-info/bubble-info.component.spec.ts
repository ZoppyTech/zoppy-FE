import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleInfoComponent } from './bubble-info.component';

describe('BubbleInfoComponent', () => {
    let component: BubbleInfoComponent;
    let fixture: ComponentFixture<BubbleInfoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BubbleInfoComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(BubbleInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
