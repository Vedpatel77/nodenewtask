import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewuerComponent } from './viewuer.component';

describe('ViewuerComponent', () => {
  let component: ViewuerComponent;
  let fixture: ComponentFixture<ViewuerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewuerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewuerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
