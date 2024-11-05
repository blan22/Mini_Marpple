import { html } from 'rune-ts';

export const klasses = <T extends any>(...args: T[]) => html`${args.filter(Boolean).join(' ')}`;
