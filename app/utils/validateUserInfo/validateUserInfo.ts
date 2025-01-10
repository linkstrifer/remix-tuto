export function validateUserInfo(data: Record<string, string | string[]>) {
  const errors: Record<string, string> = {};

  const validData = Object.getOwnPropertyNames(data);

  if ('name' in data && !data.name) {
    errors['name'] = 'Name is required';
  }

  if ('email' in data && !data.email) {
    errors['email'] = 'Email is required';
  }

  if ('phone' in data && !data.phone) {
    errors['phone'] = 'Phone is required';
  }

  if (data.phone && data.phone.toString().length < 10) {
    errors['phone'] = 'Please enter a valid phone number';
  }

  return {
    errors,
    validData: validData.filter(
      (inputName) => !Object.getOwnPropertyNames(errors).includes(inputName)
    ),
    formData: data,
  };
}
