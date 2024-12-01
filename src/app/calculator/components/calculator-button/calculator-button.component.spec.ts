import { Component, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';

@Component({
	imports: [CalculatorButtonComponent],
	template: '<calculator-button>5</calculator-button>'
})
class TestHostComponent {}

describe('CalculatorButtonComponent', () => {
	let component: CalculatorButtonComponent;
	let fixture: ComponentFixture<CalculatorButtonComponent>;
	let compiled: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CalculatorButtonComponent],
			providers: [provideExperimentalZonelessChangeDetection()]
		}).compileComponents();

		fixture = TestBed.createComponent(CalculatorButtonComponent);
		compiled = fixture.nativeElement;
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should apply w-2/4 when isDoubleSize is true', () => {
		fixture.componentRef.setInput('isDoubleSize', true);
		fixture.detectChanges();
		const hostCssClasses = compiled.classList.value.split(' ');
		expect(hostCssClasses).toContain('w-2/4');
		expect(component.isDoubleSize()).toBeTrue();
	});

	it('should emit emitClick when handleClick is called', () => {
		spyOn(component.emitClick, 'emit');
		component.handleClick();

		expect(component.emitClick.emit).toHaveBeenCalled();
	});

	it('should do nothing when keyboardPressedStyle is called with an empty string', () => {
		component.keyboardPressedStyle('');

		expect(component.isPressed()).toBeFalse();
	});

	it('should set isPressed to true when keyboardPressedStyle is called', (done) => {
		const contentValue = component.contentValue();
		if(contentValue) {
			contentValue.nativeElement.innerText = '1'
		}
		component.keyboardPressedStyle('1');

		expect(component.isPressed()).toBeTrue();

		setTimeout(() => {
			expect(component.isPressed()).toBeFalse();
			done();
		}, 101);
	});

	it('should display projected content', () => {
		const testHostFixture = TestBed.createComponent(TestHostComponent);
		const compiledTestHost = testHostFixture.nativeElement;
		const btn = compiledTestHost.querySelector('button') as HTMLButtonElement;
		expect(btn.innerText).toBe('5');
	});
});
