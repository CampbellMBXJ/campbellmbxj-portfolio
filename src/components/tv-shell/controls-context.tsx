import { createContext, useContext, useState, type PropsWithChildren } from "react";

type TvControls = {
  isMuted: boolean;
  isPowered: boolean;
  toggleIsPowered(): void;
  toggleIsMuted(): void;
};

const ControlsContext = createContext<TvControls | null>(null);

export function useTvControls() {
  const controls = useContext(ControlsContext);
  if (!controls) throw new Error("useTvControls must be used inside ControlsProvider");
  return controls;
}

export function ControlsProvider({ children }: PropsWithChildren) {
  const [isMuted, setIsMuted] = useState(false);
  const [isPowered, setIsPowered] = useState(true);

  return (
    <ControlsContext.Provider value={{
      isMuted,
      isPowered,
      toggleIsMuted: () => setIsMuted((muted) => !muted),
      toggleIsPowered: () => setIsPowered((powered) => !powered),
    }}>
      {children}
    </ControlsContext.Provider>
  );
}
