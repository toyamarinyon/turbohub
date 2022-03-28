import { assert, expect, test } from "vitest";
import { parseUrl } from "./url";

// Edit an assertion and save to see HMR in action

test("works properly", () => {
  const pullRequestUrl =
    "https://api.github.com/repos/toyamarinyon/turbohub/pulls/178";
  const { owner, repository, type, number } = parseUrl(pullRequestUrl);
  const paths = pullRequestUrl.replace("https://api.github.com/repos", "");
  expect(owner).toBe("toyamarinyon");
  expect(repository).toBe("turbohub");
  expect(type).toBe("pulls");
  expect(number).toBe(178);
});
