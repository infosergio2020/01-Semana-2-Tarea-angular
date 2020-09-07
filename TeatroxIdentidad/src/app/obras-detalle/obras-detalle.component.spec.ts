import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObrasDetalleComponent } from './obras-detalle.component';

describe('ObrasDetalleComponent', () => {
  let component: ObrasDetalleComponent;
  let fixture: ComponentFixture<ObrasDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObrasDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObrasDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
