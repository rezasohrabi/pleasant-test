namespace App {
  export interface Validatable {
    value: string;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
  }

  export function validate(validatableInput: Validatable) {
    let isValid = true;
    if (validatableInput.required) {
      isValid = isValid && validatableInput.value.trim().length > 0;
    }
    if (validatableInput.minLength) {
      isValid =
        isValid &&
        validatableInput.value.trim().length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength) {
      isValid =
        isValid &&
        validatableInput.value.trim().length <= validatableInput.maxLength;
    }
    return isValid;
  }
}
