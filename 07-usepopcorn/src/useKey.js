import { useEffect } from "react";

export function useKey(key, action) {
    // this sets listener for the entire document
    useEffect(function () {
        function callback(e) {
            if(e.code.toLowerCase === key.toLowerCase) {
                action();
            }
        }

        document.addEventListener("keydown", callback);

        // clean up function to remove even listener so it is not copied to another component
        return function() {
            document.removeEventListener("keydown", callback);
        }

    }, [action, key]
    );
}