import { createContext, FC, ReactNode, useState } from "react";

type ControlsCtxType = {
  isMuted: boolean;
  isPowered: boolean;
  toggleIsPowered: () => void;
  toggleIsMuted: () => void;
};

export const ControlsCtx = createContext<ControlsCtxType>(null as any);

const ControlsProvider: FC<ReactNode> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPowered, setIsPowered] = useState(true);

  const toggleIsMuted = () => {
    setIsMuted((isMuted) => !isMuted);
  };

  const toggleIsPowered = () => {
    setIsPowered((isPowered) => !isPowered);
  };

  return (
    <ControlsCtx.Provider
      value={{ isMuted, toggleIsMuted, isPowered, toggleIsPowered }}
    >
      {children}
    </ControlsCtx.Provider>
  );
};

export default ControlsProvider;
