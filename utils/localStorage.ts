export function saveLocalData<T>(name: string, data: T): void {
  const savedData = typeof data !== 'string' ? JSON.stringify(data) : data;
  localStorage.setItem(name, savedData);
}

export const getLocalData = <T>(name: string): T | null => {
  const data = localStorage.getItem(name);
  if (data !== null) {
    try {
      return JSON.parse(data) as T;
    } catch (error) {
      console.log({ error }, 'localStorage parse error');
      // Handle parsing error if needed
    }
  }
  return null;
};

export const removeLocalData = (name: string): void => {
  localStorage.removeItem(name);
};
