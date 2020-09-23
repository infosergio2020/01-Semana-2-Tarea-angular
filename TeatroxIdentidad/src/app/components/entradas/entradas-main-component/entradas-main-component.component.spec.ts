import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradasMainComponentComponent } from './entradas-main-component.component';

describe('EntradasMainComponentComponent', () => {
  let component: EntradasMainComponentComponent;
  let fixture: ComponentFixture<EntradasMainComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntradasMainComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradasMainComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
