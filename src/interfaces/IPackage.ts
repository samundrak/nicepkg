import { IDistTags } from "./IDistTags";
import { IMaintainer } from "./IMaintainer";
import { IRepository } from "./IRepository";

export interface IPackage {
  _id: string;
  _rev: string;
  name: string;
  description: string;
  "dist-tags": IDistTags;
  versions: { [key: string]: any };
  maintainers: IMaintainer[];
  time: {
    // will be in ISO
    [key: string]: string;
  };
  repository: IRepository;
  readme: string;
  readmeFilename: string;
  homepage: string;
  keywords: string[];
  bugs: {
    url: string;
  };
  users: {};
  license: string;
}
