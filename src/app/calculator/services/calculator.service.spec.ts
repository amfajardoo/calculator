import { TestBed } from '@angular/core/testing';

import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()]
    });
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return when input is not allowed', () => {
    service.constructNumber('a');
    expect(service.result()).toBe('0');

    service.constructNumber('10');
    expect(service.result()).toBe('0');
  });

  it('should handle "Backspace"', () => {
    service.constructNumber('1');
    service.constructNumber('2');
    service.constructNumber('3');
    service.constructNumber('Backspace');

    expect(service.result()).toBe('12');
  });

  it('should return 0 when Backspace is pressed and result is 0', () => {
    service.constructNumber('Backspace');
    expect(service.result()).toBe('0');
  });

  it('should return 0 when Backspace is pressed and result is negative and just one number', () => {
    service.constructNumber('1');
    service.constructNumber('+/-');
    service.constructNumber('Backspace');

    expect(service.result()).toBe('0');
  });

  it('should do nothing when max length is reached', () => {
    service.constructNumber('1');
    service.constructNumber('2');
    service.constructNumber('3');
    service.constructNumber('4');
    service.constructNumber('5');
    service.constructNumber('6');
    service.constructNumber('7');
    service.constructNumber('8');
    service.constructNumber('9');
    service.constructNumber('0');

    expect(service.result()).toBe('123456789');
  });

  it('should be created with default values', () => {
    expect(service.result()).toBe('0');
    expect(service.subResult()).toBe('0');
    expect(service.lastOperator()).toBe('');
  });

  it('should update result with a number', () => {
    service.constructNumber('1');
    expect(service.result()).toBe('1');

    service.constructNumber('2');
    expect(service.result()).toBe('12');
  });

  it('should handle operations', () => {
    service.constructNumber('1');
    service.constructNumber('2');
    service.constructNumber('+');

    expect(service.subResult()).toBe('12');
    expect(service.lastOperator()).toBe('+');
    expect(service.result()).toBe('0');
  });

  it('should validate . input', () => {
    service.constructNumber('.');
    expect(service.result()).toBe('0.');
  });

  it('should do nothing when 0 is pressed', () => {
    service.constructNumber('0');
    expect(service.result()).toBe('0'); 
  });

  it('should change sign to negative', () => {
    service.constructNumber('3');
    service.constructNumber('4');
    service.constructNumber('+/-');

    expect(service.result()).toBe('-34');
  });

  it('should change sign to positive', () => {
    service.constructNumber('3');
    service.constructNumber('4');
    service.constructNumber('+/-');
    service.constructNumber('+/-');

    expect(service.result()).toBe('34');
  });

  it('should keep 0 when change sign is pressed', () => {
    service.constructNumber('0');
    service.constructNumber('+/-');

    expect(service.result()).toBe('0');
  });

  describe('should calculate result', () => {
    it('with "+"', () => {
      service.constructNumber('1');
      service.constructNumber('2');
      service.constructNumber('+');
      service.constructNumber('3');
      service.constructNumber('4');
      service.constructNumber('=');
  
      expect(service.result()).toBe('46');
    });

    it('with "-"', () => {
      service.constructNumber('1');
      service.constructNumber('2');
      service.constructNumber('-');
      service.constructNumber('3');
      service.constructNumber('4');
      service.constructNumber('=');
  
      expect(service.result()).toBe('-22');
    });

    it('with "*"', () => {
      service.constructNumber('1');
      service.constructNumber('2');
      service.constructNumber('*');
      service.constructNumber('3');
      service.constructNumber('4');
      service.constructNumber('=');
  
      expect(service.result()).toBe('408');
    });

    it('with "/"', () => {
      service.constructNumber('1');
      service.constructNumber('2');
      service.constructNumber('/');
      service.constructNumber('3');
      service.constructNumber('4');
      service.constructNumber('=');
  
      expect(service.result()).toBe('0.35294117647058826');
    });
  });

  describe('should set result, and subResult to "0" when clear is called', () => {

    beforeEach(() => {
      service.result.set('1');
      service.subResult.set('2');
      service.lastOperator.set('+');
    });

    it('with "C"', () => { 
      service.constructNumber('C');
  
      expect(service.result()).toBe('0');
      expect(service.subResult()).toBe('0');
      expect(service.lastOperator()).toBe('');
    });

    it('with "Escape"', () => { 
      service.constructNumber('Escape');
  
      expect(service.result()).toBe('0');
      expect(service.subResult()).toBe('0');
      expect(service.lastOperator()).toBe('');
    });

    it('with "Delete"', () => { 
      service.constructNumber('Delete');
  
      expect(service.result()).toBe('0');
      expect(service.subResult()).toBe('0');
      expect(service.lastOperator()).toBe('');
    });
  });
});
