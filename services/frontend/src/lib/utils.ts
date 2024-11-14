import { html } from 'rune-ts';

export const klasses = <T extends any>(...args: T[]) => html`${args.filter(Boolean).join(' ')}`;

export const convertURLtoFile = async (url: string) => {
  const response = await fetch(url);
  const data = await response.blob();
  const ext = url.split('.').pop();
  const filename = url.split('/').pop();
  const metadata = { type: `image/${ext}` };
  return new File([data], filename!, metadata);
};

export const getParamsFromUrl = () => {
  if (typeof window === 'undefined') throw new Error('브라우저 환경에서만 사용해주세요.');
  // eslint-disable-next-line no-undef
  const segments = window.location.pathname.split('/').filter(Boolean);
  return parseInt(`${segments[segments.length - 1]}`, 10);
};

export const redirect = (url: string) => {
  if (typeof window === 'undefined') throw new Error('브라우저 환경에서만 사용해주세요.');
  // eslint-disable-next-line no-undef
  window.location.assign(url);
};

export const replace = (url: string) => {
  if (typeof window === 'undefined') throw new Error('브라우저 환경에서만 사용해주세요.');
  // eslint-disable-next-line no-undef
  window.location.replace(url);
};

export const reload = () => {
  if (typeof window === 'undefined') throw new Error('브라우저 환경에서만 사용해주세요.');
  // eslint-disable-next-line no-undef
  window.location.reload();
};
