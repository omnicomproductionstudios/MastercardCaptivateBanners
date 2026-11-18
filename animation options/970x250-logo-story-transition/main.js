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

  // Frame 1: Dot grows, separates, then reveals the centered lockup.
  tl.addLabel("frame1", 0)
    .set("#brand-symbol", { autoAlpha: 1, scale: 0, transformOrigin: "485px 124px" })
    .to("#brand-symbol", 0.55, { scale: 1, ease: "power3.out" }, "frame1+=0.08")
    .to(".brand-red", 0.55, { attr: { cx: 255 }, ease: "power2.inOut" }, "frame1+=0.58")
    .to(".brand-orange", 0.55, { attr: { cx: 306 }, ease: "power2.inOut" }, "frame1+=0.58")
    .fromTo("#brand-wordmark", 0.55, { autoAlpha: 0, clipPath: "inset(0 100% 0 0)" }, { autoAlpha: 1, clipPath: "inset(0 0% 0 0)", ease: "power2.out" }, "frame1+=1.15");

  // Frame 2: The same circles expand into side arcs before the hero reveal.
  tl.addLabel("frame2", "frame1+=2.15")
    .to("#brand-wordmark", 0.25, { autoAlpha: 0, ease: "sine.inOut" }, "frame2")
    .set(".brand-overlap", { autoAlpha: 0 }, "frame2+=0.25")
    .to("#brand-symbol > .brand-red", 0.8, { attr: { cx: -96, cy: 125, r: 157.317, fill: "#ff5f00" }, opacity: 0.65, ease: "power2.inOut" }, "frame2+=0.25")
    .to("#brand-symbol > .brand-orange:not(.brand-overlap)", 0.8, { attr: { cx: 1066, cy: 125, r: 157.317, fill: "#ff5f00" }, opacity: 0.65, ease: "power2.inOut" }, "frame2+=0.25")
    .addLabel("storyStart", "frame2+=1.05")
    .fromTo("#story", 0.5, { scale: 0.94, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, ease: "power2.out" }, "storyStart")
    .set("#opening", { autoAlpha: 0 })
    .to("#yes-line", 0.45, { autoAlpha: 1, ease: "power1.out" }, "+=0.1")
    .to("#trust-line", 0.45, { autoAlpha: 1, ease: "power1.out" }, "+=0.15")
    .to("#yes-line, #trust-line", 0.35, { autoAlpha: 0, ease: "sine.inOut" }, "+=2.5")
    .to("#story, #brand-symbol", 0.4, { autoAlpha: 0, ease: "sine.inOut" })
    .addLabel("storyEnd");

  // Frame 3: The mark reforms in the center, then the headline pushes it right.
  tl.addLabel("frame3", "+=0.15")
    .set("#closing", { autoAlpha: 1 }, "frame3")
    .set(".brand-red", { attr: { cx: 485, cy: 124, r: 41.5, fill: "#eb001b" }, opacity: 1 }, "frame3")
    .set(".brand-orange", { attr: { cx: 485, cy: 124, r: 41.5, fill: "#f79e1b" }, opacity: 1 }, "frame3")
    .set(".brand-overlap", { attr: { fill: "#ff5f00" }, autoAlpha: 1 }, "frame3")
    .set("#brand-symbol", { autoAlpha: 1, scale: 0 }, "frame3")
    .to("#brand-symbol", 0.55, { scale: 1, ease: "power3.out" }, "frame3+=0.08")
    .to(".brand-red", 0.55, { attr: { cx: 459.5 }, ease: "power2.inOut" }, "frame3+=0.58")
    .to(".brand-orange", 0.55, { attr: { cx: 510.5 }, ease: "power2.inOut" }, "frame3+=0.58")
    .addLabel("headline", "frame3+=1.25")
    .fromTo("#priceless", 0.75, { x: -60, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power2.inOut" }, "headline")
    .to(".brand-red", 0.75, { attr: { cx: 683 }, ease: "power2.inOut" }, "headline")
    .to(".brand-orange", 0.75, { attr: { cx: 734 }, ease: "power2.inOut" }, "headline")
    .to("#cta", 0.4, { autoAlpha: 1, ease: "power1.out" }, "+=0.15");

  // Frame 4: The mark sweeps the priceless line away and reveals cybersecurity.
  tl.addLabel("frame4", "+=1.8")
    .to("#priceless", 0.65, { x: -90, autoAlpha: 0, ease: "power2.inOut" }, "frame4")
    .to(".brand-red", 0.8, { attr: { cx: 220.5 }, ease: "power2.inOut" }, "frame4")
    .to(".brand-orange", 0.8, { attr: { cx: 271.5 }, ease: "power2.inOut" }, "frame4")
    .set("#brand-wordmark", { x: -34.5 }, "frame4+=0.5")
    .fromTo("#brand-wordmark", 0.55, { autoAlpha: 0, clipPath: "inset(0 100% 0 0)" }, { autoAlpha: 1, clipPath: "inset(0 0% 0 0)", ease: "power2.out" }, "frame4+=0.65")
    .to("#cta", 0.2, { scale: 1.08, ease: "sine.inOut" }, "+=0.15")
    .to("#cta", 0.2, { scale: 1, ease: "sine.inOut" });

  const duration = tl.labels.storyEnd - tl.labels.storyStart;
  tl.to(motion, duration, {
    elapsed: duration,
    ease: "none",
    onUpdate: function () {
      const step = Math.floor(motion.elapsed * 10) % 28;
      const frame = step < 15 ? step : 28 - step;
      sprite.style.backgroundPosition = `${-(frame % 5) * 970}px ${-Math.floor(frame / 5) * 250}px`;
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
  gsap.to("#cta", 0.2, { scale: 1.06, ease: "power1.inOut", overwrite: "auto" });
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
