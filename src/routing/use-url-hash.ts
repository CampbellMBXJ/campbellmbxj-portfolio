import Router from "next/router";
import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  Router.events.on("hashChangeComplete", onChange);
  Router.events.on("routeChangeComplete", onChange);
  window.addEventListener("hashchange", onChange);
  return () => {
    Router.events.off("hashChangeComplete", onChange);
    Router.events.off("routeChangeComplete", onChange);
    window.removeEventListener("hashchange", onChange);
  };
}

// Hashes are unavailable to the server. Keep the first hydration render in sync
// with the server, then subscribe to both Next navigation and native history.
export function useUrlHash() {
  return useSyncExternalStore(
    subscribe,
    () => window.location.hash.slice(1),
    () => ""
  );
}
