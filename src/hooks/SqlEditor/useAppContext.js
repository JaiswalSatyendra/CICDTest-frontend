import { useContext } from "react";
import AppContext from "../../contexts/SqlContext";

/**
 * Accepts a selector function which can be used to select a value at any
 * level of the App context, like the `useSelector` hook from redux
 *
 * @param {(context) => {}} callback
 */

function useAppContext(callback = (context) => context) {
  // App Context

  const ctx = useContext(AppContext);

  // Return the up-to-date selected value
  return callback(ctx);
}

export default useAppContext;
