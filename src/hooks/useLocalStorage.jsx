import { useState, useEffect, useCallback } from 'react';

/**
 * useLocalStorage
 * Custom hook for persisting state to localStorage.
 * 
 * Implementation choices:
 * - Lazy initialization: Reads from localStorage only once on mount for performance.
 * - Error handling: Uses try/catch for both reading and writing to prevent crashes from invalid JSON or quota errors.
 * - SSR safety: Checks for 'window' to avoid errors during server-side rendering.
 * - Sync across tabs: Listens for 'storage' events so state updates if localStorage changes in another tab.
 * - useCallback for readValue: Memoizes the function to avoid unnecessary re-creation and ensure up-to-date logic.
 * - Type safety: Works with any value type, not just strings or objects.
 * 
 * @param {string} key - The localStorage key.
 * @param {any} initialValue - The initial value if nothing is stored.
 * @returns {[any, Function]} - [value, setValue]
 */
export function useLocalStorage(key, initialValue) {
  // Lazy initializer for reading from localStorage
  const readValue = useCallback(() => {
    // SSR safety: Only access window if defined
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      // If item exists, parse it; otherwise use initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Error handling: Prevent crash on invalid JSON
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  // State initialized with value from localStorage
  // Lazy initialization to avoid reading localStorage on every render
  // When you pass a function to useState, React treats it as a lazy initializer: 
  // React essentially does: "If this is the first render, call readValue() to get the initial value. Otherwise, ignore it."
  const [storedValue, setStoredValue] = useState(readValue);

  // Persist value to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      // Error handling: Prevent crash on quota exceeded
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Sync state across tabs/windows
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleStorage = (event) => {
      if (event.key === key) {
        setStoredValue(readValue());
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key, readValue]);

  return [storedValue, setStoredValue];
}