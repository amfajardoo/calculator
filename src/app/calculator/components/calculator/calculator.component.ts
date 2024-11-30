import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

@Component({
	selector: 'calculator',
	imports: [CalculatorButtonComponent],
	templateUrl: './calculator.component.html',
	styleUrl: './calculator.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent {
	handleClick(key: string) {
		console.log(key);
	}
}
