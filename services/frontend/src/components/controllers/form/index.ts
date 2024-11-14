import { CustomEventWithDetail, Enable, on } from 'rune-ts';
import type { ZodError, ZodObject, ZodRawShape } from '@monorepo/shared';
import { each, entries, pipe, reduce, take } from '@fxts/core';
import { Form } from '../../cell';

export class FormValidationErrorEvent extends CustomEventWithDetail<string> {}

class FormController<T extends object = {}> extends Enable<T> {
  constructor(
    public override view: Form<T>,
    private _validator: ZodObject<ZodRawShape>,
  ) {
    super(view);
  }

  validate(formData: FormData) {
    return this._validator.parseAsync(Object.fromEntries(formData.entries()));
  }

  setMultipartsInFormData(formData: FormData) {
    each(([key, value]: [string, File | null]) => formData.set(key, value), entries(this.view.multiparts));
  }

  emitValidationError(error: ZodError) {
    this.dispatchEvent(FormValidationErrorEvent, {
      bubbles: true,
      detail: pipe(
        error.issues,
        take(1),
        reduce((issue) => issue),
      ).message,
    });
  }

  @on('submit')
  private _submit(e: SubmitEvent) {
    e.preventDefault();

    const formData: FormData = new FormData(e.target as HTMLFormElement);

    if (this.view.isMultiparts()) this.setMultipartsInFormData(formData);

    this.validate(formData)
      .then((result) => this.view.submit(result))
      .catch(this.emitValidationError.bind(this));
  }
}

export { FormController };
