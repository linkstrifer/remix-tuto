import { calculateCurrentStep } from './calculateCurrentStep';
import { describe, expect, it } from 'vitest';

describe('calculateCurrentStep', () => {
  it('should return userInfo when validData is empty', () => {
    expect(calculateCurrentStep([])).toBe('userInfo');
  });

  it('should return summary when validData contains name, email, phone, plan, addons', () => {
    expect(
      calculateCurrentStep(['name', 'email', 'phone', 'plan', 'addons'])
    ).toBe('summary');
  });

  it('should return addons if validData contains name, email, phone, plan', () => {
    expect(calculateCurrentStep(['name', 'email', 'phone', 'plan'])).toBe(
      'addons'
    );
  });

  it('should return plan if validData contains name, email, phone', () => {
    expect(calculateCurrentStep(['name', 'email', 'phone'])).toBe('plan');
  });

  it('should return userInfo if overwrite is userInfo', () => {
    expect(calculateCurrentStep([], 'userInfo')).toBe('userInfo');
  });

  it('should return summary if overwrite is summary', () => {
    expect(calculateCurrentStep([], 'summary')).toBe('summary');
  });

  it('should return addons if overwrite is addons', () => {
    expect(calculateCurrentStep([], 'addons')).toBe('addons');
  });

  it('should return plan if overwrite is plan', () => {
    expect(calculateCurrentStep([], 'plan')).toBe('plan');
  });
});
