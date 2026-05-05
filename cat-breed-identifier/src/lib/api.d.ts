declare module '*.json' {
  const value: Record<string, import('./api').BreedDetail>;
  export default value;
}
