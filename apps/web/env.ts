import { envsafe, str } from "envsafe";

export const env = envsafe({
  NODE_ENV: str({
    devDefault: "development",
    choices: ["development", "test", "production"],
  }),
  GITHUB_PERSONAL_ACCESS_TOKEN: str(),
});
