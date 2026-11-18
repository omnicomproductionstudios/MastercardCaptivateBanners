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

  // Let the opening lockup clear before revealing the next frame.
  tl.addLabel("frame2", "frame1+=2.35")
    .to("#opening", 0.3, { autoAlpha: 0, ease: "power1.inOut" }, "frame2")
    .to("#story", 0.4, { autoAlpha: 1, ease: "power1.inOut" })
    .to("#story-copy", 0.45, { autoAlpha: 1, ease: "power1.out" }, "+=0.1")
    .to("#story-copy", 0.35, { autoAlpha: 0, ease: "power1.inOut" }, "+=2.85");

  // Clear the story before bringing back the lockup, priceless line and CTA.
  tl.addLabel("frame3")
    .to("#story", 0.35, { autoAlpha: 0, ease: "power1.inOut" })
    .to("#closing", 0.4, { autoAlpha: 1, ease: "power1.inOut" })
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
