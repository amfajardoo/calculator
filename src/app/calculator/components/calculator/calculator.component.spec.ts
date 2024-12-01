import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
	let component: CalculatorComponent;
	let fixture: ComponentFixture<CalculatorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CalculatorComponent],
			providers: [provideExperimentalZonelessChangeDetection()]
		}).compileComponents();

		fixture = TestBed.createComponent(CalculatorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
