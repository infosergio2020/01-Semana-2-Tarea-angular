import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormObraFuncionComponent } from './form-obra-funcion.component';

describe('FormObraFuncionComponent', () => {
  let component: FormObraFuncionComponent;
  let fixture: ComponentFixture<FormObraFuncionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormObraFuncionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormObraFuncionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
