import { createContext, useState } from "react";

export const ScrollPositionContext = createContext<{
  inboxPosition: number;
  setInboxPosition: (position: number) => void;
}>({
  inboxPosition: 0,
  setInboxPosition: () => {},
});

export function ScrollPositionContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [inboxPosition, setInboxPosition] = useState(0);

  return (
    <ScrollPositionContext.Provider
      value={{
        inboxPosition,
        setInboxPosition,
      }}
    >
      {children}
    </ScrollPositionContext.Provider>
  );
}
