import { IPackage } from "../../interfaces/IPackage";

export const ADD_NEW_PACKAGE = "ADD_NEW_PACKAGE";
export const DELETE_PACKAGE = "DELETE_PACKAGE";
export const ADD_NEW_PACKAGES = "ADD_NEW_PACKAGES";

export function addPackage(packageInfo: IPackage) {
  return {
    type: ADD_NEW_PACKAGE,
    payload: packageInfo,
  };
}
export function addPackages(packageInfo: IPackage[]) {
  return {
    type: ADD_NEW_PACKAGES,
    payload: packageInfo,
  };
}
export function deletePackage(packageId: string) {
  return {
    type: DELETE_PACKAGE,
    payload: {
      id: packageId,
    },
  };
}
