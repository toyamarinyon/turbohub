import { createClient } from "urql";

export const client = createClient({
  url: "https://api.github.com/graphql",
  fetchOptions: () => {
    return {
      headers: {
        authorization: `bearer ${import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN}`,
      },
    };
  },
});
