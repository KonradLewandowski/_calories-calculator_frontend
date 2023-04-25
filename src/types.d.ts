export {};

declare global {
  type TProvider = { ({ children }: { children: JSX.Element }): JSX.Element };
}
