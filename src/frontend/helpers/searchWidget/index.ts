import { ReadonlyURLSearchParams } from 'next/navigation';

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

// Join the values with comma (or remove the key completely if empty)
export const updateQueryString = (
  key: string,
  value: string,
  searchParams: ReadonlyURLSearchParams,
  shouldRemoveValue = false
) => {
  const params = new URLSearchParams(searchParams.toString());

  let values: string;
  if (shouldRemoveValue) {
    values =
      params
        .get(key)
        ?.split(',')
        ?.filter((v) => v !== value)
        ?.join(',') ?? '';
  } else {
    values = [...params.getAll(key), value].join(',');
  }

  if (values) {
    params.set(key, values);
  } else {
    params.delete(key);
  }
  return params.toString();
};
