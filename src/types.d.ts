export {};

declare global {
  type TProvider = { ({ children }: { children: JSX.Elements }): JSX.Elements };
}
