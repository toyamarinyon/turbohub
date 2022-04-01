import { createContext } from "react";

export const ResourceContext = createContext<{
  onBackButtonClick: () => void;
  onArchiveButtonClick: () => void;
}>({
  onBackButtonClick: () => {},
  onArchiveButtonClick: () => {},
});

export function ResourceContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ResourceContext.Provider
      value={{
        onBackButtonClick: () => {
          history.back();
        },
        onArchiveButtonClick: () => {},
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
}
