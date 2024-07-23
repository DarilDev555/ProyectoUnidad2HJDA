import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEpicComponent } from './table-epic.component';

describe('TableEpicComponent', () => {
  let component: TableEpicComponent;
  let fixture: ComponentFixture<TableEpicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableEpicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableEpicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
