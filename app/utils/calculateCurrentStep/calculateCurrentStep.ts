export type CurrentStep = 'userInfo' | 'plan' | 'addons' | 'summary' | 'thanks';

export function calculateCurrentStep(
  validData: string[],
  overwrite?: CurrentStep | null
) {
  let calculatedCurrentStep: CurrentStep = 'userInfo';

  if (overwrite) {
    return overwrite;
  }

  if (
    ['name', 'email', 'phone', 'plan', 'addons'].every((fieldName) =>
      validData.includes(fieldName)
    )
  ) {
    calculatedCurrentStep = 'summary';
  } else if (
    ['name', 'email', 'phone', 'plan'].every((fieldName) =>
      validData.includes(fieldName)
    )
  ) {
    calculatedCurrentStep = 'addons';
  } else if (
    ['name', 'email', 'phone'].every((fieldName) =>
      validData.includes(fieldName)
    )
  ) {
    calculatedCurrentStep = 'plan';
  }

  return calculatedCurrentStep;
}
