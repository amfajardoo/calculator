import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { CalculatorButtonComponent } from './calculator-button.component';

describe('CalculatorButtonComponent', () => {
	let component: CalculatorButtonComponent;
	let fixture: ComponentFixture<CalculatorButtonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CalculatorButtonComponent],
			providers: [provideExperimentalZonelessChangeDetection()]
		}).compileComponents();

		fixture = TestBed.createComponent(CalculatorButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
