import { useState } from "react";

export function GitHubRestApiPlayground() {
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState("");
  return (
    <div className="overflow-scroll">
      <h1>GitHub REST API Playground</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await fetch(url, {
            headers: {
              Accept: "application/vnd.github.v3+json",
              Authorization: `bearer ${
                import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN
              }`,
            },
          });
          const json = await response.json();
          setResponse(JSON.stringify(json, null, 2));
        }}
      >
        <fieldset>
          <label htmlFor="url">URL</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </fieldset>
        <button type="submit">Submit</button>
      </form>
      <pre className="break-all">{response}</pre>
    </div>
  );
}
