var tl;
var startTime;


function init() {
  startTime = new Date();
  tl = gsap.timeline({ onComplete: logDuration });
  animate();
  setRollover();
}
gsap.config({
  force3D: true
});
function animate() {
  // Grow from a small orange dot, then separate into the Mastercard mark.
  tl.addLabel("frame1", 0)
    .set("#opening-symbol", { autoAlpha: 1, scale: 0, transformOrigin: "150px 123.22px" }, "frame1")
    .to("#opening-symbol", 0.55, { scale: 1, ease: "power3.out" }, "frame1+=0.08")
    .to(".logo-red", 0.55, { attr: { cx: 137.29 }, ease: "power2.inOut" }, "frame1+=0.58")
    .to(".logo-orange", 0.55, { attr: { cx: 162.28 }, ease: "power2.inOut" }, "frame1+=0.58")
    .fromTo("#opening-wordmark", 0.55, { autoAlpha: 0, clipPath: "inset(0 100% 0 0)" }, { autoAlpha: 1, clipPath: "inset(0 0% 0 0)", ease: "power2.out" }, "frame1+=1.15");

  // The same logo circles expand and move into the photo's side arcs.
  tl.addLabel("frame2", "frame1+=1.85")
    .to("#opening-wordmark", 0.2, { autoAlpha: 0, ease: "sine.inOut" }, "frame2")
    .set("#opening-symbol circle[fill='#ff5f00']", { autoAlpha: 0 }, "frame2+=0.2")
    .to("#opening-symbol > .logo-red", 0.85, {
      attr: { cx: -57, cy: 125, r: 90, fill: "#ff5f00" },
      opacity: 0.5,
      ease: "power2.inOut"
    }, "frame2+=0.2")
    .to("#opening-symbol > .logo-orange:not([clip-path])", 0.85, {
      attr: { cx: 357, cy: 125, r: 90, fill: "#ff5f00" },
      opacity: 0.72,
      ease: "power2.inOut"
    }, "frame2+=0.2")
    .to("#story", 0.45, { autoAlpha: 1, ease: "sine.inOut" }, "frame2+=1.05")
    .set("#opening", { autoAlpha: 0 })
    .to("#story-copy", 0.45, { autoAlpha: 1, ease: "power1.out" }, "+=0.1")
    .to("#story-copy", 0.35, { autoAlpha: 0, ease: "sine.inOut" }, "+=2.85");

  // Return the same side circles to their original logo positions.
  tl.addLabel("frame3")
    .to("#story", 0.35, { autoAlpha: 0, ease: "sine.inOut" }, "frame3")
    .set("#closing", { autoAlpha: 1 }, "frame3+=0.35")
    .to("#opening-symbol > .logo-red", 0.85, {
      attr: { cx: 137.29, cy: 123.22, r: 20.22, fill: "#eb001b" },
      opacity: 1,
      ease: "power2.inOut"
    }, "frame3+=0.35")
    .to("#opening-symbol > .logo-orange:not([clip-path])", 0.85, {
      attr: { cx: 162.28, cy: 123.22, r: 20.22, fill: "#f79e1b" },
      opacity: 1,
      ease: "power2.inOut"
    }, "frame3+=0.35")
    .to("#logo-red-clip .logo-red", 0.85, {
      attr: { cx: 137.29 },
      ease: "power2.inOut"
    }, "frame3+=0.35")
    .to("#opening-symbol > circle[clip-path]", 0.85, {
      attr: { cx: 162.28 },
      ease: "power2.inOut"
    }, "frame3+=0.35")
    .to("#opening-symbol > circle[clip-path]", 0.15, { autoAlpha: 1, ease: "sine.inOut" }, "frame3+=1.05")
    .fromTo("#closing-wordmark", 0.55, { autoAlpha: 0, clipPath: "inset(0 100% 0 0)" }, { autoAlpha: 1, clipPath: "inset(0 0% 0 0)", ease: "power2.out" }, "frame3+=1.25")
    .to("#priceless", 0.45, { autoAlpha: 1, ease: "power1.out" }, "+=0.1")
    .to("#cta", 0.4, { autoAlpha: 1, ease: "power1.out" }, "+=0.15")
    .to("#cta", 0.1, { scale: 1.1, ease: "power1.inOut" }, "+=0.15")
    .to("#cta", 0.1, { scale: 1, ease: "power1.inOut" });
}

function setRollover() {
  document
    .getElementById("default_exit")
    .addEventListener("mouseover", defaultOver, false);
  document
    .getElementById("default_exit")
    .addEventListener("mouseout", defaultOut, false);
}

function defaultOver() {
  if (tl.progress() < 1) return;
  gsap.to("#cta", 0.1, { scale: 1.1, ease: "power1.inOut", overwrite: "auto" });
}

function defaultOut() {
  if (tl.progress() < 1) return;
  gsap.to("#cta", 0.1, { scale: 1, ease: "power1.inOut", overwrite: "auto" });
}


function logDuration() {
  let endTime = new Date();
  console.log(
    "Animation duration: " +
    ((endTime - startTime) / 1000).toFixed(2) +
    " seconds",
  );
}
