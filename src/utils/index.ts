import Millify from "millify";

export const fetcher = (...args: any) =>
  // @ts-ignore
  fetch(...args).then((res) => res.json());

export const convertToHumanReadableNumbers = (value: number) => {
  if (!isFinite(value)) return 0;
  return Millify(value);
};
