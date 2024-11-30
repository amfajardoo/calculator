import {
	ChangeDetectionStrategy,
	Component,
	type ElementRef,
	input,
	linkedSignal,
	output,
	signal,
	viewChild
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

	isPressed = signal(false);

	handleClick() {
		this.emitClick.emit(this.innerText());
	}

	keyboardPressedStyle(key: string) {
		if(!this.innerText() || key !== this.innerText()) {
			return;
		}

		this.isPressed.set(true);

		setTimeout(() => {
			this.isPressed.set(false);
		}, 100);
	}
}
