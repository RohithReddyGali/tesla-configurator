import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigSelectionComponent } from './config-selection.component';

describe('ConfigSelectionComponent', () => {
  let component: ConfigSelectionComponent;
  let fixture: ComponentFixture<ConfigSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
