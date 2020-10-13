import produce from "immer";
import { IPackage } from "../../interfaces/IPackage";

export interface IPackageState {
  name: string;
  packages: IPackage[];
}

export const stateFactory = (): IPackageState => ({
  name: "samundra",
  packages: [],
});

export default function (
  state: IPackageState,
  action?: {
    payload: {
      [key: string]: any;
    };
  }
): IPackageState {
  return produce(state, (draft) => {
    return draft;
  });
}
