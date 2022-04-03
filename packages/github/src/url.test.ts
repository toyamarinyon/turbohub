import { expect, test } from "vitest";
import { parseUrl } from "./url";

// Edit an assertion and save to see HMR in action

test("works properly with rest api", () => {
  const pullRequestUrl =
    "https://api.github.com/repos/toyamarinyon/turbohub/pulls/178";
  const { owner, repository, type, number } = parseUrl(pullRequestUrl);
  expect(owner).toBe("toyamarinyon");
  expect(repository).toBe("turbohub");
  expect(type).toBe("pulls");
  expect(number).toBe("178");
});

test("works properly with graphql api", () => {
  const pullRequestUrl = "https://github.com/toyamarinyon/turbohub/pulls/178";
  const { owner, repository, type, number } = parseUrl(pullRequestUrl);
  expect(owner).toBe("toyamarinyon");
  expect(repository).toBe("turbohub");
  expect(type).toBe("pulls");
  expect(number).toBe("178");
});

test("works properly with commit url", () => {
  const url =
    "https://api.github.com/repos/toyamarinyon/slidev-theme-sat0shi/commits/e71fa4969770726a38397821ba5b68727d70642e";
  const { owner, repository, type, number } = parseUrl(url);
  expect(owner).toBe("toyamarinyon");
  expect(repository).toBe("slidev-theme-sat0shi");
  expect(type).toBe("commits");
  expect(number).toBe("e71fa4969770726a38397821ba5b68727d70642e");
});

test("works properly with relative url", () => {
  const url =
    "toyamarinyon/slidev-theme-sat0shi/commits/e71fa4969770726a38397821ba5b68727d70642e";
  const { owner, repository, type, number } = parseUrl(url);
  expect(owner).toBe("toyamarinyon");
  expect(repository).toBe("slidev-theme-sat0shi");
  expect(type).toBe("commits");
  expect(number).toBe("e71fa4969770726a38397821ba5b68727d70642e");
});
