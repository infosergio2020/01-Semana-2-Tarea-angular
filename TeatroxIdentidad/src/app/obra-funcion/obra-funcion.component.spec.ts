import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObraFuncionComponent } from './obra-funcion.component';

describe('ObraFuncionComponent', () => {
  let component: ObraFuncionComponent;
  let fixture: ComponentFixture<ObraFuncionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObraFuncionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObraFuncionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
