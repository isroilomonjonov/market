export const setItem = (key: string, data: any) => {
  try {
    localStorage.setItem(key, data);
  } catch (error) {}
};

export const getItem = (key: string) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "");
  } catch (error) {}
};

export const removeItem = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {}
};
