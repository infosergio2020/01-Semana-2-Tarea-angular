import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradasComponentComponent } from './entradas-component.component';

describe('EntradasComponentComponent', () => {
  let component: EntradasComponentComponent;
  let fixture: ComponentFixture<EntradasComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntradasComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradasComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
