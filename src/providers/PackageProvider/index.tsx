import React, { useReducer, Dispatch } from "react";
import actions, { IPackageState, stateFactory } from "./actions";

export const PackageContext = React.createContext<
  Partial<{
    state: IPackageState;
    dispatch: React.DispatchWithoutAction;
  }>
>({}!);

const PackageProvider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(actions, stateFactory());

  return (
    <PackageContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </PackageContext.Provider>
  );
};

export default PackageProvider;