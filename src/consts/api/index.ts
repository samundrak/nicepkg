import { IPackage } from "../../interfaces/IPackage";

export const NPM_SEARCH = "https://api.npms.io/v2/search?q=";
export const PACKAGE_INFO = "https://api.npms.io/v2/package/mget";

export const getPackageInformation = (dependencies: string[]) => {
  return fetch(`${PACKAGE_INFO}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(dependencies),
  }).then((response) => response.json()) as Promise<{
    [key: string]: { code?: string; collected: IPackage };
  }>;
};
