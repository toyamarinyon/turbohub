import { envsafe, str } from "envsafe";

export const env = envsafe({
  GITHUB_PERSONAL_ACCESS_TOKEN: str({
    input: import.meta.env?.VITE_GITHUB_PERSONAL_ACCESS_TOKEN || '',
  }),
});
