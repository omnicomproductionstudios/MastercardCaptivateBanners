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
  // Frame 1: Hold, squeeze together, then release the lock.
  tl.addLabel("frame1", 0)
    .to(".opening-red", 0.24, { attr: { cx: 263 }, ease: "sine.inOut" }, "frame1+=0.72")
    .to(".opening-orange", 0.24, { attr: { cx: 298.5 }, ease: "sine.inOut" }, "frame1+=0.72")
    .to(".opening-red", 0.42, { attr: { cx: 255 }, ease: "sine.inOut" }, "frame1+=0.96")
    .to(".opening-orange", 0.42, { attr: { cx: 306.5 }, ease: "sine.inOut" }, "frame1+=0.96");

  // The same circles separate to either side of the non-full-bleed image.
  tl.addLabel("frame2", "frame1+=1.62")
    .to("#opening-wordmark", 0.2, { autoAlpha: 0, ease: "sine.inOut" }, "frame2")
    .to(".opening-red", 0.65, { attr: { cx: -96.1, r: 157.417 }, ease: "power2.inOut" }, "frame2+=0.15")
    .to(".opening-orange", 0.65, { attr: { cx: 1066.1, r: 157.417 }, ease: "power2.inOut" }, "frame2+=0.15")
    .to(".red-stop, .orange-stop", 0.3, { attr: { "stop-color": "#ff5f00" }, ease: "sine.inOut" }, "frame2+=0.6")
    .to(".red-fade, .orange-fade", 0.3, { attr: { "stop-opacity": 0 }, ease: "sine.inOut" }, "frame2+=0.6")
    .addLabel("storyStart", "frame2+=0.3")
    .to("#opening", 0.4, { autoAlpha: 0, ease: "sine.inOut" }, "storyStart")
    .to("#story", 0.4, { autoAlpha: 1, ease: "sine.inOut" }, "storyStart")
    .to("#story-copy", 0.45, { autoAlpha: 1, ease: "power1.out" }, "+=0.1")
    .to("#story-copy", 0.35, { autoAlpha: 0, ease: "power1.inOut" }, "+=2.85");

  // Clear the story before bringing back the lockup, priceless line and CTA.
  tl.addLabel("frame3")
    .to("#story, #opening-symbol", 0.35, { autoAlpha: 0, ease: "power1.inOut" })
    .to("#closing", 0.4, { autoAlpha: 1, ease: "power1.inOut" })
    .to("#priceless", 0.45, { autoAlpha: 1, ease: "power1.out" }, "+=0.1")
    .to("#cta", 0.4, { autoAlpha: 1, ease: "power1.out" }, "+=0.15")

    // Frame 4: Meet, lock together, then settle left and reveal cybersecurity.
    .addLabel("frame4", "+=1.5")
    .to("#closing", 0.35, { autoAlpha: 0, ease: "sine.inOut" }, "frame4")
    .set("#final", { autoAlpha: 1 }, "frame4+=0.35")
    .to("#final-symbol", 0.2, { autoAlpha: 1, ease: "sine.out" }, "frame4+=0.45")
    .to(".final-red", 0.65, { attr: { cx: 459.25 }, ease: "power3.out" }, "frame4+=0.45")
    .to(".final-orange", 0.65, { attr: { cx: 510.75 }, ease: "power3.out" }, "frame4+=0.45")
    .to(".final-red", 0.24, { attr: { cx: 467.25 }, ease: "sine.inOut" }, "frame4+=1.2")
    .to(".final-orange", 0.24, { attr: { cx: 502.75 }, ease: "sine.inOut" }, "frame4+=1.2")
    .to(".final-red", 0.42, { attr: { cx: 459.25 }, ease: "sine.inOut" }, "frame4+=1.44")
    .to(".final-orange", 0.42, { attr: { cx: 510.75 }, ease: "sine.inOut" }, "frame4+=1.44")
    .to(".final-red", 0.55, { attr: { cx: 220.5 }, ease: "sine.inOut" }, "frame4+=2")
    .to(".final-orange", 0.55, { attr: { cx: 272 }, ease: "sine.inOut" }, "frame4+=2")
    .fromTo("#final-wordmark", 0.65, {
      autoAlpha: 0,
      "--reveal": "100%"
    }, {
      autoAlpha: 1,
      "--reveal": "0%",
      ease: "sine.out"
    }, "frame4+=2.3")
    .to("#final-cta", 0.4, { autoAlpha: 1, ease: "power1.out" }, "+=0.15");

  const duration = tl.labels.frame3 + 0.35 - tl.labels.storyStart;
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
