import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradasDetalleComponentComponent } from './entradas-detalle-component.component';

describe('EntradasDetalleComponentComponent', () => {
  let component: EntradasDetalleComponentComponent;
  let fixture: ComponentFixture<EntradasDetalleComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntradasDetalleComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradasDetalleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
