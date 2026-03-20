function load(src) {
  const img = new Image();
  img.src = src;
  return img;
}

export const IMAGES = {
  imp: load(impSheet),
  elite: load(eliteSheet),
  bullet: load(bulletImgSrc),
  cannon: load(cannonImgSrc),
};