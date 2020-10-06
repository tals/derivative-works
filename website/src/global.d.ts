namespace NodeJS {
  declare class Process {
    /**
     * Constant that will be inlined by Rollup and rollup-plugin-consts.
     */
    CDN_ROOT: any;
  }
}
declare namespace NodeJS {
  declare var process: {
    env: {
      NODE_ENV: string;
    };
    browser: string;
  };
}
