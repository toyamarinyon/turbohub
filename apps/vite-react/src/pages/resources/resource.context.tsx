import { createContext } from "react";

export const ResourceContext = createContext<{
  onBackButtonClick: () => void;
}>({
  onBackButtonClick: () => {},
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
          console.log('hello')
          history.back();
        },
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
}
