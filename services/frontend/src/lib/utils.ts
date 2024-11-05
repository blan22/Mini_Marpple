import { html } from 'rune-ts';

const klasses = <T extends any>(...args: T[]) => html`${args.filter(Boolean).join(' ')}`;

export { klasses };
