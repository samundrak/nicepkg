export interface IGithub {
  homepage: string;
  starsCount: number;
  forksCount: number;
  subscribersCount: number;
  issues: {
    count: number;
    openCount: Number;
    distribution: {
      [key: string]: number;
      //   "3600": 3992;
      //   "10800": 1916;
      //   "32400": 1950;
      //   "97200": 2447;
      //   "291600": 1874;
      //   "874800": 1750;
      //   "2624400": 1397;
      //   "7873200": 1201;
      //   "23619600": 1518;
      //   "70858800": 1246;
      //   "212576400": 365;
    };
    isDisabled: boolean;
  };
  contributors: {
    username: string;
    commitsCount: string;
  }[];
  commits: {
    from: string;
    to: string;
    count: number;
  }[];
  statuses: { context: string }[];
}
