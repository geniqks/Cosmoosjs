
export function exclude<Property extends Record<string, any>, Key extends keyof Property>(
  user: Property,
  keys: Key[]
): Omit<Property, Key> {
  const filteredEntries = Object.entries(user)
    .filter(([key]) => !keys.includes(key as Key))
    // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as Omit<Property, Key>);

  return filteredEntries;
}
