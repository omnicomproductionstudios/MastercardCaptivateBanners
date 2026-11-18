var tl;

function init() {
  tl = gsap.timeline();
  animate();
}

function animate() {
  // Circles meet in the center before the lockup settles for the tagline.
  tl.addLabel("logo", 0)
    .to(".logo-red", 0.65, { attr: { cx: 68.5 }, ease: "power3.out" }, "logo+=0.15")
    .to(".logo-orange", 0.65, { attr: { cx: 83 }, ease: "power3.out" }, "logo+=0.15")
    .addLabel("tagline", "+=0.15")
    .to(".logo-red", 0.55, { attr: { cx: 12 }, ease: "sine.inOut" }, "tagline")
    .to(".logo-orange", 0.55, { attr: { cx: 26.5 }, ease: "sine.inOut" }, "tagline")
    .fromTo("#wordmark", 0.65, {
      autoAlpha: 0,
      "--reveal": "100%"
    }, {
      autoAlpha: 1,
      "--reveal": "0%",
      ease: "sine.out"
    }, "tagline+=0.35");

  // Trust flows in while the complete lockup moves to its final position.
  tl.addLabel("trust", "+=0.45")
    .to("#logo", 0.75, { x: 72.75, ease: "power2.inOut" }, "trust")
    .fromTo("#priceless", 0.75, { x: -16, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power2.inOut" }, "trust+=0.1");
}
