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
  const storyFadeOut = 0.35;
  // Ease into the center, then settle before the wordmark rises in.
  tl.addLabel("frame1", 0)
    .to(".opening-red", 0.86, { attr: { cx: 287.25 }, ease: "power3.out" }, "frame1+=0.24")
    .to(".opening-orange", 0.86, { attr: { cx: 352.75 }, ease: "power3.out" }, "frame1+=0.24")
    .to(".opening-red", 0.18, { attr: { cx: 291.75 }, ease: "sine.inOut", repeat: 1, yoyo: true }, "frame1+=1.15")
    .to(".opening-orange", 0.18, { attr: { cx: 348.25 }, ease: "sine.inOut", repeat: 1, yoyo: true }, "frame1+=1.15")
    .to(".opening-red", 0.5, { attr: { cx: 287.25, cy: 239 }, ease: "sine.inOut" }, "frame1+=1.86")
    .to(".opening-orange", 0.5, { attr: { cx: 352.75, cy: 239 }, ease: "sine.inOut" }, "frame1+=1.86")
    .fromTo("#opening-lockup", 0.42, { autoAlpha: 0, y: 5 }, { autoAlpha: 1, y: 0, ease: "sine.out" }, "frame1+=2.04");

  // Let the opening lockup clear before revealing the next frame.
  tl.addLabel("frame2", "frame1+=2.75")
    .to("#opening", 0.3, { autoAlpha: 0, ease: "power1.inOut" }, "frame2")
    .addLabel("storyStart")
    .to("#story", 0.4, { autoAlpha: 1, ease: "power1.inOut" })
    .to("#story-copy", 0.45, { autoAlpha: 1, ease: "power1.out" }, "+=0.1")
    .to("#story-copy", 0.35, { autoAlpha: 0, ease: "power1.inOut" }, "+=3.1");

  // Clear the story before bringing back the lockup, priceless line and CTA.
  tl.addLabel("frame3")
    .to("#story", storyFadeOut, { autoAlpha: 0, ease: "power1.inOut" })
    .to("#closing", 0.4, { autoAlpha: 1, ease: "power1.inOut" })
    .to("#priceless", 0.45, { autoAlpha: 1, ease: "power1.out" }, "+=0.1")
    .to("#cta", 0.4, { autoAlpha: 1, ease: "power1.out" }, "+=0.15")
    .to("#cta", 0.2, { scale: 1.1, ease: "power1.inOut" }, "+=0.15")
    .to("#cta", 0.2, { scale: 1, ease: "power1.inOut" });

  // Start the CSS pan/zoom as the photo appears and let it run through the fade.
  const panDuration = tl.labels.frame3 + storyFadeOut - tl.labels.storyStart;
  tl.set("#story-photo", {
    "--pan-duration": `${panDuration}s`,
    "--pan-state": "running",
  }, "storyStart");
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
  gsap.to("#cta", 0.2, { scale: 1.1, ease: "power1.inOut", overwrite: "auto" });
}

function defaultOut() {
  if (tl.progress() < 1) return;
  gsap.to("#cta", 0.2, { scale: 1, ease: "power1.inOut", overwrite: "auto" });
}


function logDuration() {
  let endTime = new Date();
  console.log(
    "Animation duration: " +
    ((endTime - startTime) / 1000).toFixed(2) +
    " seconds",
  );
}
