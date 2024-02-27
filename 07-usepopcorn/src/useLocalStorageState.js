import { useState, useEffect } from "react";


export function useLocalStorageState(initialState, key) {
    const [value, setValue] = useState(function() {
        const storedValue = localStorage.getItem(key)
        // covert back from stringify to map (we do that in setItem)

        return storedValue ? JSON.parse(storedValue) : initialState;
        }
    );

    // adding value to local storage
    useEffect(function () {
        localStorage.setItem(key, JSON.stringify(value));
        },
        [value, key]
    );

   return [value, setValue];

}