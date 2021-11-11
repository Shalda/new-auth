import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsSignInComponent } from './aws-sign-in.component';

describe('AwsSignInComponent', () => {
  let component: AwsSignInComponent;
  let fixture: ComponentFixture<AwsSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwsSignInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AwsSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
