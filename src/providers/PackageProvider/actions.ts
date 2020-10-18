import produce from "immer";
import { IPackage } from "../../interfaces/IPackage";
import { ADD_NEW_PACKAGE } from "./action-creator";

export interface IPackageState {
  packages: IPackage[];
}

export const stateFactory = (): IPackageState => ({
  packages: [],
});

export default function (
  state: IPackageState,
  action?: {
    type: string;
    payload: {
      [key: string]: any;
    };
  }
): IPackageState {
  return produce(state, (draft) => {
    switch (action?.type) {
      case ADD_NEW_PACKAGE:
        state.packages.push(action.payload as IPackage);
    }
    return draft;
  });
}
