import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';

@Component({
  selector: 'calculator-button',
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.scss',
  host: {
    class: "w-1/4 border-r border-b border-indigo-400",
    'data-cy': 'calculator-button'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorButtonComponent {

  booleanFn = (value: boolean | string) => typeof value === 'string' || value;

  isCommand = input(false, { 
    transform: this.booleanFn
  });

  isDoubleSize = input(false, { 
    transform: this.booleanFn
  });

  @HostBinding('class.w-2/4') get doubleSize() {
    return this.isDoubleSize();
  }
}
