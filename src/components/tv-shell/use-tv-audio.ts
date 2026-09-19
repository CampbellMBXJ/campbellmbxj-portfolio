import { Howl } from "howler";
import { useCallback, useEffect, useRef } from "react";

export function useTvAudio(isMuted: boolean, isPowered: boolean) {
  const sound = useRef<Howl | null>(null);

  useEffect(() => () => {
    sound.current?.unload();
    sound.current = null;
  }, []);

  return useCallback(() => {
    if (isMuted || !isPowered) return;
    // Initialize on the client when a transition needs audio, never during SSR.
    sound.current ??= new Howl({ src: ["/audio/crt_static.wav"], volume: 0.03 });
    sound.current.play();
  }, [isMuted, isPowered]);
}
