import { describe, expect, it } from 'vitest';
import { validateUserInfo } from './validateUserInfo';

describe('validateUserInfo', () => {
  it('should return validData if object is pass', () => {
    expect(
      validateUserInfo({
        name: 'John Doe',
        email: 'john@doe.com',
      })
    ).toStrictEqual({
      validData: ['name', 'email'],
      errors: {},
      formData: {
        name: 'John Doe',
        email: 'john@doe.com',
      },
    });
  });

  it('should return validData if object is pass', () => {
    const formData = new FormData();

    formData.set('name', 'John Doe');
    formData.set('email', 'john@doe.com');

    expect(validateUserInfo(formData)).toStrictEqual({
      validData: ['name', 'email'],
      errors: {},
      formData: {
        name: 'John Doe',
        email: 'john@doe.com',
      },
    });
  });

  it('should validate name', () => {
    expect(validateUserInfo({ name: '' })).toStrictEqual({
      validData: [],
      errors: {
        name: 'Name is required',
      },
      formData: {
        name: '',
      },
    });
  });

  it('should validate email', () => {
    expect(validateUserInfo({ email: '' })).toStrictEqual({
      validData: [],
      errors: {
        email: 'Email is required',
      },
      formData: {
        email: '',
      },
    });
  });

  it('should validate phone', () => {
    expect(validateUserInfo({ phone: '' })).toStrictEqual({
      validData: [],
      errors: {
        phone: 'Phone is required',
      },
      formData: {
        phone: '',
      },
    });
  });

  it('should validate phone length', () => {
    expect(validateUserInfo({ phone: '123' })).toStrictEqual({
      validData: [],
      errors: {
        phone: 'Please enter a valid phone number',
      },
      formData: {
        phone: '123',
      },
    });
  });

  it('should validate all data and return no errors', () => {
    const data = {
      name: 'John Doe',
      email: 'john@doe.com',
      phone: '1234567890',
      ['input' + Math.random()]: 'random' + Math.random(),
    };

    expect(validateUserInfo(data)).toStrictEqual({
      validData: Object.getOwnPropertyNames(data),
      errors: {},
      formData: data,
    });
  });
});
