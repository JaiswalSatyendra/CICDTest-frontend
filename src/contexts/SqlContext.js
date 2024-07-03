import { useState, useEffect, createContext } from "react";
import { getTablesMockData } from "../utils/SqlEditor/mockData";

/**
 * Context to manage app state
 * Can be replaced with Redux Store
 */
const AppContext = createContext(null);

/**
 * Context Provider to wrap component with AppContext
 * giving access to context Data
 */
export const AppContextProvider = ({ children }) => {
  const [tablesData, setTablesData] = useState({});
  const [selectedTable, setSelectedTable] = useState({
    tableName: "",
    aliasName: "",
  });

  return (
    <AppContext.Provider
      value={{ tablesData, setTablesData, selectedTable, setSelectedTable }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
