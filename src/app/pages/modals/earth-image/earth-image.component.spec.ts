import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarthImageComponent } from './earth-image.component';

describe('EarthImageComponent', () => {
  let component: EarthImageComponent;
  let fixture: ComponentFixture<EarthImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarthImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarthImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
