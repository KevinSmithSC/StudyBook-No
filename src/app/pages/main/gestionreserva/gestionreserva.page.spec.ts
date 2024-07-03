import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionreservaPage } from './gestionreserva.page';

describe('GestionreservaPage', () => {
  let component: GestionreservaPage;
  let fixture: ComponentFixture<GestionreservaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionreservaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
