import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactExampleComponent } from './react-example.component';

describe('ReactExampleComponent', () => {
  let component: ReactExampleComponent;
  let fixture: ComponentFixture<ReactExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
