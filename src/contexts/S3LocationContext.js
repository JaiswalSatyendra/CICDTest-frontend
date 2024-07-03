import { useState, createContext, useEffect } from "react";

/**
 * Context to manage app state
 * Can be replaced with Redux Store
 */
export const S3LocationContext = createContext();

/**
 * Context Provider to wrap component with S3LocationContext
 * giving access to context Data
 */
export const S3LocationContextProvider = ({ children }) => {
  const [s3Location, sets3Location] = useState("");

  return (
    <S3LocationContext.Provider
      value={{
        s3Location,
        sets3Location,
      }}
    >
      {children}
    </S3LocationContext.Provider>
  );
};
