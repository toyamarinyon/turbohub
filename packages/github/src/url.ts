interface RepositoryPath {
  owner: string;
  repository: string;
  type: string;
  number: number;
}
export function parseUrl(url: string): RepositoryPath {
  const paths = url.replace("https://api.github.com/repos", "");
  const [_, owner, repository, type, number] = paths.split("/");
  return {
    owner,
    repository,
    type,
    number: parseInt(number),
  };
}
