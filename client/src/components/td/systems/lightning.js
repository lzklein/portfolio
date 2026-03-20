export const updateLightnings = (state) => {
  state.lightnings = state.lightnings.filter(bolt => {
    return Date.now() - bolt.createdAt < bolt.duration;
  });
}