export const getItemFromStorage = <T>(itemName: string): T | undefined => {
  if (!globalThis?.localStorage) return undefined;
  const item = globalThis.localStorage.getItem(itemName);
  if (typeof item === "undefined") return undefined;
  return item as T;
};

export const setItemToStorage = <T>(itemName: string, data: any): void => {
  if (!globalThis?.localStorage)
    return console.error("local storage is not available");
  globalThis.localStorage.setItem(itemName, data);
};
