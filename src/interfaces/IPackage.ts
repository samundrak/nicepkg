import { IDistTags } from "./IDistTags";
import { IMaintainer } from "./IMaintainer";
import { IRepository } from "./IRepository";
import { IGithub } from "./IGithub";

export interface IPackage {
  metadata: {
    name: string;
    scope: "unscoped" | "scoped";
    version: string;
    description: string;
    author: {
      name: string;
      email: string;
    };
    date: string;
    keywords: string;
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
    publisher: {
      username: string;
      email: string;
    };
  };
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
