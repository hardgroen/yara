import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@app/@shared/material.module';
import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MaterialModule],
      declarations: [LoaderComponent],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    fixture.detectChanges();
  });

  it('should not be visible by default', () => {
    // Arrange
    const element = fixture.nativeElement;
    const div = element.querySelectorAll('div')[0];

    // Assert
    expect(div.getAttribute('hidden')).not.toBeNull();
  });

  it('should be visible when app is loading', () => {
    // Arrange
    const element = fixture.nativeElement;
    const div = element.querySelectorAll('div')[0];

    // Act
    fixture.componentInstance.isLoading = true;
    fixture.detectChanges();

    // Assert
    expect(div.getAttribute('hidden')).toBeNull();
  });

  it('should not display a message by default', () => {
    // Arrange
    const element = fixture.nativeElement;
    const span = element.querySelectorAll('span')[0];

    // Assert
    expect(span.textContent).toBe('');
  });

  it('should display specified message', () => {
    // Arrange
    const element = fixture.nativeElement;
    const span = element.querySelectorAll('span')[0];

    // Act
    fixture.componentInstance.message = 'testing';
    fixture.detectChanges();

    // Assert
    expect(span.textContent).toBe('testing');
  });
});
