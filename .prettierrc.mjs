import oclifConfig from "@oclif/prettier-config";

/**
 * @type {import("prettier").Config}
 */
const config = {
  ...oclifConfig,
  semi: true,
};

export default config;