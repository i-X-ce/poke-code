import { useState } from "react";

const useStorage = <T>(
  key: string,
  initValue: T,
  convert?: {
    toString: (value: T) => string;
    fromString: (value: string) => T;
  }
): [T, (value: T | ((prev: T) => T)) => void] => {
  const toString = (value: T): string => {
    if (convert) {
      return convert.toString(value);
    } else {
      return JSON.stringify(value);
    }
  };
  const fromString = (value: string): T => {
    if (convert) {
      return convert.fromString(value);
    } else {
      return JSON.parse(value);
    }
  };

  const [value, setValue] = useState<T>(
    (() => {
      try {
        const item = window.localStorage.getItem(key);
        if (!item) {
          window.localStorage.setItem(key, toString(initValue));
          return initValue;
        }
        return fromString(item);
      } catch (error) {
        console.error(error);
        return initValue;
      }
    })()
  );

  const setStorage = (value: T | ((prev: T) => T)) => {
    try {
      if (typeof value === "function") {
        const fn = value as (prev: T) => T;
        setValue((prev) => {
          const newValue = fn(prev);
          window.localStorage.setItem(key, toString(newValue));
          return newValue;
        });
      } else {
        setValue(value);
        window.localStorage.setItem(key, toString(value));
      }
    } catch (error) {
      console.error(error);
      setValue(initValue);
    }
  };

  return [value, setStorage];
};

export default useStorage;
