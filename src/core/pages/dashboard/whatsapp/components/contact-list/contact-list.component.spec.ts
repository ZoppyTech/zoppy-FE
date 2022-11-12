import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ContactListComponent } from './contact-list.component';

describe('ContactListComponent', () => {
    let component: ContactListComponent;
    let fixture: ComponentFixture<ContactListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ContactListComponent],
            imports: [HttpClientTestingModule, RouterTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(ContactListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
