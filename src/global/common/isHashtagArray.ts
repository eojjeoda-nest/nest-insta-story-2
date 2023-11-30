import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsHashtagArray(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isHashtagArray',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value) {
          return (
            Array.isArray(value) &&
            value.every(
              (item) => typeof item === 'string' && item.startsWith('#'),
            )
          );
        },
      },
    });
  };
}
