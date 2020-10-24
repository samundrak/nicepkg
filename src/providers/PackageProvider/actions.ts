import produce from "immer";
import { IPackage } from "../../interfaces/IPackage";
import {
  ADD_NEW_PACKAGE,
  DELETE_PACKAGE,
  ADD_NEW_PACKAGES,
} from "./action-creator";

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
      case ADD_NEW_PACKAGES:
        draft.packages = action.payload as IPackage[];
        break;
      case ADD_NEW_PACKAGE:
        draft.packages.push(action.payload as IPackage);
        break;
      case DELETE_PACKAGE:
        const packageIndex = draft.packages.findIndex(
          (item) => item.metadata.name === action.payload.id
        );
        draft.packages.splice(packageIndex, 1);
        break;
    }
    return draft;
  });
}
