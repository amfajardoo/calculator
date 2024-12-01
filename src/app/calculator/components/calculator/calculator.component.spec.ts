import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorService } from '@/calculator/services/calculator.service';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorComponent } from './calculator.component';

class MockCalculatorService {
	result = jasmine.createSpy('result').and.returnValue('10.5');
	subResult = jasmine.createSpy('subResult').and.returnValue('0');
	lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');

	constructNumber = jasmine.createSpy('constructNumber');
}

describe('CalculatorComponent', () => {
	let component: CalculatorComponent;
	let fixture: ComponentFixture<CalculatorComponent>;
	let compiled: HTMLElement;
	let service: MockCalculatorService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CalculatorComponent],
			providers: [provideExperimentalZonelessChangeDetection(), {
				provide: CalculatorService,
				useClass: MockCalculatorService
			}]
		}).compileComponents();

		fixture = TestBed.createComponent(CalculatorComponent);
		component = fixture.componentInstance;
		compiled = fixture.nativeElement;
		service = TestBed.inject(CalculatorService) as unknown as MockCalculatorService;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have the current getters', () => {
		expect(component.resultText()).toBe('10.5');
		expect(component.subResultText()).toBe('0 +');
	});

	it('should display proper calculation values', () => {
		service.result.and.returnValue('20.5');
		service.subResult.and.returnValue('10');
		service.lastOperator.and.returnValue('-');
		fixture.detectChanges();
		const resultSpan = compiled.querySelector('span:not(.text-4xl)');
		const subResultSpan = compiled.querySelector('span.text-4xl');

		expect(resultSpan?.textContent).toBe('20.5');
		expect(subResultSpan?.textContent).toBe('10 -');
	});

	it('should have calculator-button components', () => {
		const buttons = compiled.querySelectorAll('calculator-button');
		const btnsByDirective = fixture.debugElement.queryAll(
			By.directive(CalculatorButtonComponent)
		)
		expect(component.calculatorButtons()).toBeTruthy();
		expect(buttons.length).toBe(19);
		expect(btnsByDirective.length).toBe(19);
		expect(buttons[0].textContent).toBe('C');
	});

	describe('should handle keyboard events', () => {
		const eventEnter = new KeyboardEvent('keyup', { key: 'Enter' });
		
		it('with "Enter"', () => {
			document.dispatchEvent(eventEnter);
			expect(service.constructNumber).toHaveBeenCalledWith('=');
		});

		it('with the number keys', () => {
			document.dispatchEvent(new KeyboardEvent('keyup', { key: '1' }));
			expect(service.constructNumber).toHaveBeenCalledWith('1');

			document.dispatchEvent(new KeyboardEvent('keyup', { key: '2' }));
			expect(service.constructNumber).toHaveBeenCalledWith('2');
		});
	})
});
