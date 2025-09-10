import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContact } from './modal-contact';

describe('ModalContact', () => {
  let component: ModalContact;
  let fixture: ComponentFixture<ModalContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalContact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalContact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
