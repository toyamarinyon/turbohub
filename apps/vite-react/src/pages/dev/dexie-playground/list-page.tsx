import { useNavigate } from "@tanstack/react-location";
import { db } from "@turbohub/dexie";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";

export function DexiePlaygroundListPage() {
  const [inputThreadId, setInputThreadId] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const threadResponseCaches = useLiveQuery(async () => {
    return await db.threadResponseCaches.toArray();
  });
  const navigate = useNavigate();
  return (
    <div>
      <h1>Dexie Playground</h1>
      <section className="p-2 bg-gray-50">
        {threadResponseCaches?.map((threadResponseCache) => (
          <div key={threadResponseCache.threadId}>
            <header>{threadResponseCache.threadId}</header>
            <p>{threadResponseCache.url}</p>
            <button
              onClick={() => navigate({ to: threadResponseCache.threadId })}
            >
              click
            </button>
          </div>
        ))}
      </section>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          db.threadResponseCaches.add({
            threadId: parseInt(inputThreadId),
            url: inputUrl,
          });
          setInputThreadId("");
          setInputUrl("");
        }}
      >
        <label htmlFor="threadId">Thread Id</label>
        <input
          type="text"
          id="threadIdxwx"
          name="threadId"
          value={inputThreadId}
          onChange={(event) => {
            setInputThreadId(event.target.value);
          }}
        />
        <label htmlFor="url">Url</label>
        <input
          type="text"
          id="url"
          name="url"
          value={inputUrl}
          onChange={(event) => {
            setInputUrl(event.target.value);
          }}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
