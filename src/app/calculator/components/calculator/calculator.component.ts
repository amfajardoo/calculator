import { CalculatorService } from '@/calculator/services/calculator.service';
import { ChangeDetectionStrategy, Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

@Component({
	selector: 'calculator',
	imports: [CalculatorButtonComponent],
	templateUrl: './calculator.component.html',
	styleUrl: './calculator.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'(document:keyup)': 'handleKeyboardEvent($event)'
	}
})
export class CalculatorComponent {
	#calculatorService = inject(CalculatorService);
	calculatorButtons = viewChildren(CalculatorButtonComponent);

	resultText = computed(() => this.#calculatorService.result());
	subResultText = computed(() => `${this.#calculatorService.subResult()} ${this.#calculatorService.lastOperator()}`);

	handleClick(key: string) {
		this.#calculatorService.constructNumber(key);
	}

	handleKeyboardEvent(event: KeyboardEvent) {
		const keyEquivalents: Record<string, string> = {
			Escape: 'C',
			Backspace: 'C',
			Delete: 'C',
			Enter: '=',
			'*': 'x',
			'/': '÷',
		}
		const keyValue = keyEquivalents[event.key] || event.key;
		this.handleClick(keyValue);
		for (const button of this.calculatorButtons()) {
			button.keyboardPressedStyle(keyValue)
		}
	}
}
