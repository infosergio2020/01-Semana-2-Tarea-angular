import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradasMasInfoComponentComponent } from './entradas-mas-info-component.component';

describe('EntradasMasInfoComponentComponent', () => {
  let component: EntradasMasInfoComponentComponent;
  let fixture: ComponentFixture<EntradasMasInfoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntradasMasInfoComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradasMasInfoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
