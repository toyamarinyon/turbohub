interface RepositoryPath {
  owner: string;
  repository: string;
  type: string;
  number: string;
}
export function parseUrl(url: string): RepositoryPath {
  const paths = url.replace(/(https:\/\/api.github.com\/repos|https:\/\/github.com)/, "");
  const [_, owner, repository, type, number] = paths.split("/");
  return {
    owner,
    repository,
    type,
    number,
  };
}
