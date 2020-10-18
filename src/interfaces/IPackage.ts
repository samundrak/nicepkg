import { IDistTags } from "./IDistTags";
import { IMaintainer } from "./IMaintainer";
import { IRepository } from "./IRepository";
import { IGithub } from "./IGithub";

export interface IPackage {
  name: string;
  scope: "unscoped" | "scoped";
  version: string;
  description: string;
  keywords: string[];
  date: string;
  publisher: {
    username: string;
    email: string;
  };
  maintainers: IMaintainer[];
  repository: IRepository;
  links: {
    npm: string;
    homepage: string;
    repository: string;
    bugs: string;
  };
  license: string;
  dependencies: {
    [key: string]: string;
  };
  releases: [];
  hasSelectiveFiles: true;
  npm: {
    downloads: {
      from: string;
      to: string;
      count: number;
    }[];
    dependentsCount: number;
    starsCount: number;
  };
  github: IGithub;
}
