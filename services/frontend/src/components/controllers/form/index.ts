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

  private _validate(formData: FormData) {
    return this._validator.parseAsync(Object.fromEntries(formData.entries()));
  }

  private _setMultipartsInFormData(formData: FormData) {
    // @ts-ignore
    each(([key, value]: [string, File | null]) => formData.set(key, value), entries(this.view.multiparts));
  }

  private _emitValidationError(error: ZodError) {
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

    if (this.view.isMultiparts()) this._setMultipartsInFormData(formData);

    this._validate(formData)
      .then((result) => this.view.submit(result))
      .catch(this._emitValidationError.bind(this));
  }
}

export { FormController };
