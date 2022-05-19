export const fadeOutAnimation = {
  name: "fadeOutAnimation",
  animate: {
    opacity: [1, 1, 1, 1, 0.05]
  },
  transition: {
    duration: 0.6,
  },
};

export const fadeInAnimation = {
  name: "fadeInAnimation",
  animate: {
    opacity: [1, 0, 0, 0, 0, 0, 1]
  },
  transition: {
    duration: 0.6,
  },
}
