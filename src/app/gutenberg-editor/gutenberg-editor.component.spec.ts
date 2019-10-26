import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GutenbergEditorComponent } from './gutenberg-editor.component';

describe('GutenbergEditorComponent', () => {
  let component: GutenbergEditorComponent;
  let fixture: ComponentFixture<GutenbergEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GutenbergEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GutenbergEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
