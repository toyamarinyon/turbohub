import { db } from "@turbohub/dexie";
import { useLiveQuery } from "dexie-react-hooks";

export function useThreadCache(threadId: number) {
  const threadResponseCache = useLiveQuery(async () => {
    const query = db.threadResponseCaches.where("threadId").equals(threadId);
    const data = await query.first();
    const count = await query.count();
    const isExist = count > 0;
    return { data, isExist };
  });

  return threadResponseCache;
}
