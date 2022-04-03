import { useMatch } from "@tanstack/react-location";
import { LocationGenerics } from "../../../App";
import { useThreadCache } from "../../../hooks/threadCache";

export function DexiePlaygroundShowPage() {
  const {
    params: { threadId },
  } = useMatch<LocationGenerics>();

  const threadResponseCache = useThreadCache(parseInt(threadId));

  if (threadResponseCache == undefined) {
    return <div>loading</div>;
  }
  if (!threadResponseCache.isExist) {
    return <div>nothing!</div>;
  }

  return <div>{threadResponseCache.data?.url}</div>;
}
