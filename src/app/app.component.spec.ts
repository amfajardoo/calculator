import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
	let fixture: ComponentFixture<AppComponent>;
	let compiled: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppComponent],
			providers: [provideExperimentalZonelessChangeDetection()]
		}).compileComponents();
		fixture = TestBed.createComponent(AppComponent);
		compiled = fixture.nativeElement;
	});

	it('should create the app', () => {
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it('should render router-outlet wrapped with css class', () => {
		const divElement = compiled.querySelector('div');
		const mustHaveClasses = 'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(' ');
		const divClasses = divElement?.classList.value.split(' ');
		
		for (const className of mustHaveClasses) {
			expect(divClasses).toContain(className);
		}
		expect(divElement).toBeTruthy();
		expect(compiled.querySelector('router-outlet')).toBeTruthy();
	});
});
