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
  const sprite = document.getElementById("story-sprite");
  const motion = { elapsed: 0 };
  tl.addLabel("frame1", 0);

  // Let the opening lockup clear before revealing the next frame.
  tl.addLabel("frame2", "frame1+=1.5")
    .to("#opening", 0.3, { autoAlpha: 0, ease: "power1.inOut" }, "frame2")
    .addLabel("storyStart")
    .to("#story", 0.4, { autoAlpha: 1, ease: "power1.inOut" })
    .to("#story-copy", 0.45, { autoAlpha: 1, ease: "power1.out" }, "+=0.1")
    .to("#story-copy", 0.35, { autoAlpha: 0, ease: "power1.inOut" }, "+=2.85");

  // Clear the story before bringing back the lockup, priceless line and CTA.
  tl.addLabel("frame3")
    .to("#story", 0.35, { autoAlpha: 0, ease: "power1.inOut" })
    .to("#closing", 0.4, { autoAlpha: 1, ease: "power1.inOut" })
    .to("#priceless", 0.45, { autoAlpha: 1, ease: "power1.out" }, "+=0.1")
    .to("#cta", 0.4, { autoAlpha: 1, ease: "power1.out" }, "+=0.15")

    // Frame 4: Meet at the center, shift left together, then reveal the tagline.
    .addLabel("frame4", "+=1.5")
    .to("#closing", 0.35, { autoAlpha: 0, ease: "sine.inOut" }, "frame4")
    .set("#final", { autoAlpha: 1 }, "frame4+=0.35")
    .to("#final-symbol", 0.2, { autoAlpha: 1, ease: "sine.out" }, "frame4+=0.45")
    .to(".final-red", 0.65, { attr: { cx: 470.5 }, ease: "power3.out" }, "frame4+=0.45")
    .to(".final-orange", 0.65, { attr: { cx: 499.5 }, ease: "power3.out" }, "frame4+=0.45")
    .to(".final-red", 0.55, { attr: { cx: 318.5 }, ease: "sine.inOut" }, "frame4+=1.3")
    .to(".final-orange", 0.55, { attr: { cx: 347.5 }, ease: "sine.inOut" }, "frame4+=1.3")
    .fromTo("#final-wordmark", 0.65, {
      autoAlpha: 0,
      "--reveal": "100%"
    }, {
      autoAlpha: 1,
      "--reveal": "0%",
      ease: "sine.out"
    }, "frame4+=1.85")
    .to("#final-cta", 0.4, { autoAlpha: 1, ease: "power1.out" }, "+=0.15");

  const duration = tl.labels.frame3 + 0.35 - tl.labels.storyStart;
  tl.to(motion, duration, {
    elapsed: duration,
    ease: "none",
    onUpdate: function () {
      const step = Math.floor(motion.elapsed * 10) % 28;
      const frame = step < 15 ? step : 28 - step;
      sprite.style.backgroundPosition = `${-(frame % 5) * 414.32}px ${-Math.floor(frame / 5) * 165.275}px`;
    },
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
  gsap.to("#final-cta", 0.1, { scale: 1.1, ease: "power1.inOut", overwrite: "auto" });
}

function defaultOut() {
  if (tl.progress() < 1) return;
  gsap.to("#final-cta", 0.1, { scale: 1, ease: "power1.inOut", overwrite: "auto" });
}


function logDuration() {
  let endTime = new Date();
  console.log(
    "Animation duration: " +
    ((endTime - startTime) / 1000).toFixed(2) +
    " seconds",
  );
}
