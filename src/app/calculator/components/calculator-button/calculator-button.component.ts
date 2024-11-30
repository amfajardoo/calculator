import {
	ChangeDetectionStrategy,
	Component,
	type ElementRef,
	HostBinding,
	input,
	linkedSignal,
	output,
	viewChild,
} from '@angular/core';

@Component({
	selector: 'calculator-button',
	templateUrl: './calculator-button.component.html',
	styleUrl: './calculator-button.component.scss',
	host: {
		class: 'w-1/4 border-r border-b border-indigo-400',
		'data-cy': 'calculator-button',
		'[class.w-2/4]': 'isDoubleSize()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorButtonComponent {
	contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');
	emitClick = output<string>();
	innerText = linkedSignal({
		source: this.contentValue,
		computation: (element: ElementRef<HTMLButtonElement> | undefined): string => element?.nativeElement.innerText || '',
	});
	booleanFn = (value: boolean | string) => typeof value === 'string' || value;

	isCommand = input(false, {
		transform: this.booleanFn,
	});

	isDoubleSize = input(false, {
		transform: this.booleanFn,
	});

	@HostBinding('class.w-2/4') get doubleSize() {
		return this.isDoubleSize();
	}

	handleClick() {
		this.emitClick.emit(this.innerText());
	}
}
