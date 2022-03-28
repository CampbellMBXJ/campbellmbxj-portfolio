export const fadeOutAnimation = {
  name: "crt-warp",
  variants: {
    initial: {
      opacity: 0.7,
    },
    animate: {
      opacity: 0.2,
    },
    exit: {
      opacity: 0.7
    },
  },
  transition: {
    duration: 0.6,
    times: [0, 1, 1, 1, 1, 1]
  },
};
