"use-client"
import { useEffect, useState } from "react";

export const useDebounce = (value: number, delay: number) => {
    const [debouncedInputValue, setDebouncedInputValue] = useState(value);
    const [isInputChanging, setIsInputChanging] = useState(false)

    useEffect(() => {
      setIsInputChanging(true)
      const handler = setTimeout(() => {
        setDebouncedInputValue(value);
      }, delay);

      const delayChange = setTimeout(() => {
        setIsInputChanging(false) 
      },2700)
 
      return () => {
        clearTimeout(delayChange);
        clearTimeout(handler);
      };
    }, [value, delay]);
    return {debouncedInputValue, isInputChanging};
  };