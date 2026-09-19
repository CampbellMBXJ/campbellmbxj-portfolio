import { useRouter } from "next/router";
import { channels } from "./channels";

export function useChannelNavigation() {
  const router = useRouter();
  const index = channels.findIndex((channel) => channel.href === router.pathname);
  const selectChannel = (position: number) => {
    const channel = channels[position];
    if (channel) void router.push(channel.href);
  };
  const stepChannel = (direction: 1 | -1) => {
    const next = index < 0
      ? (direction === 1 ? 0 : channels.length - 1)
      : (index + direction + channels.length) % channels.length;
    selectChannel(next);
  };

  return { channel: index < 0 ? undefined : channels[index], index, selectChannel, stepChannel, transitionKey: router.pathname };
}
