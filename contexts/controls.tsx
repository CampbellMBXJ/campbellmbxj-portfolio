import { createContext, FC, ReactNode, useState } from "react";

type ControlsCtxType = {
  isMuted: boolean;
  toggleIsMuted: () => void;
};

export const ControlsCtx = createContext<ControlsCtxType>(null as any);

const ControlsProvider: FC<ReactNode> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);

  const toggleIsMuted = () => {
    setIsMuted(!isMuted);
  }
  
  return (
    <ControlsCtx.Provider value={{isMuted, toggleIsMuted}}>{children}</ControlsCtx.Provider>
  );
};

export default ControlsProvider;
