import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionpenalizacionPage } from './gestionpenalizacion.page';

describe('GestionpenalizacionPage', () => {
  let component: GestionpenalizacionPage;
  let fixture: ComponentFixture<GestionpenalizacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionpenalizacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
