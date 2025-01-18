import oclifConfig, { printWidth } from "@oclif/prettier-config";

/**
 * @type {import("prettier").Config}
 */
const config = {
  ...oclifConfig,
  semi: true,
  printWidth: 120,
};

export default config;