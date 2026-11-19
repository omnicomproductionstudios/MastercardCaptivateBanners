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
  const frameCount = 15;
  const fps = 10;
  const loopSteps = (frameCount - 1) * 2;
  const storyFadeOut = 0.35;
  // Frame 1: Hold, squeeze together, then release the lock.
  tl.addLabel("frame1", 0)
    .to(".opening-red", 0.24, { attr: { cx: 141.29 }, ease: "sine.inOut" }, "frame1+=0.72")
    .to(".opening-orange", 0.24, { attr: { cx: 158.28 }, ease: "sine.inOut" }, "frame1+=0.72")
    .to(".opening-red", 0.42, { attr: { cx: 137.29 }, ease: "sine.inOut" }, "frame1+=0.96")
    .to(".opening-orange", 0.42, { attr: { cx: 162.28 }, ease: "sine.inOut" }, "frame1+=0.96");

  // The same circles move apart and enlarge into the photo's side arcs.
  tl.addLabel("frame2", "frame1+=1.62")
    .to("#opening-wordmark", 0.2, { autoAlpha: 0, ease: "sine.inOut" }, "frame2")
    .to(".opening-red", 0.65, {
      attr: { cx: -57, cy: 125, r: 90 },
      opacity: 1,
      ease: "power2.inOut"
    }, "frame2+=0.15")
    .to(".opening-orange", 0.65, {
      attr: { cx: 357, cy: 125, r: 90 },
      opacity: 1,
      ease: "power2.inOut"
    }, "frame2+=0.15")
    .to(".red-stop, .orange-stop", 0.4, { attr: { "stop-color": "#ff5f00" }, ease: "sine.inOut" }, "frame2+=0.4")
    .to(".red-fade, .orange-fade", 0.4, { attr: { "stop-opacity": 0 }, ease: "sine.inOut" }, "frame2+=0.4")
    .addLabel("storyStart", "frame2+=0.3")
    .to("#opening", 0.4, { autoAlpha: 0, ease: "sine.inOut" }, "storyStart")
    .to("#story", 0.4, { autoAlpha: 1, ease: "sine.inOut" }, "storyStart")
    .to("#story-copy", 0.45, { autoAlpha: 1, ease: "power1.out" }, "+=0.1")
    .to("#story-copy", 0.35, { autoAlpha: 0, ease: "power1.inOut" }, "+=3.1");

  // Frame 3: Clear the story, then bring in both logo icons together.
  tl.addLabel("frame3")
    .to("#story, #opening-symbol", storyFadeOut, { autoAlpha: 0, ease: "power1.inOut" }, "frame3")
    .set("#final", { autoAlpha: 1 }, "frame3+=0.35")
    .to("#final-heading", 0.45, { autoAlpha: 1, ease: "power1.out" }, "frame3+=0.45")
    .to(".final-red", 0.85, { attr: { cx: 137.29 }, ease: "power3.out" }, "frame3+=1.05")
    .to(".final-orange", 0.85, { attr: { cx: 162.28 }, ease: "power3.out" }, "frame3+=1.05")
    // The closing mark locks once after both circles meet.
    .to(".final-red", 0.24, { attr: { cx: 141.29 }, ease: "sine.inOut" }, "+=0.1")
    .to(".final-orange", 0.24, { attr: { cx: 158.28 }, ease: "sine.inOut" }, "<")
    .to(".final-red", 0.42, { attr: { cx: 137.29 }, ease: "sine.inOut" })
    .to(".final-orange", 0.42, { attr: { cx: 162.28 }, ease: "sine.inOut" }, "<")
    .fromTo("#final-wordmark", 0.45, {
      autoAlpha: 0,
      y: -5
    }, {
      autoAlpha: 1,
      y: 0,
      ease: "sine.out"
    }, "+=0.15")
    .to("#final-cta", 0.4, { autoAlpha: 1, ease: "power1.out" }, "+=0.15");

  // Loop the sprite from the story reveal through the end of its fade-out.
  const motionDuration = tl.labels.frame3 + storyFadeOut - tl.labels.storyStart;
  tl.to(motion, motionDuration, {
    elapsed: motionDuration,
    ease: "none",
    onUpdate: function () {
      // Reverse at each end so the loop never jumps between distant frames.
      const step = Math.floor(motion.elapsed * fps) % loopSteps;
      const frame = step < frameCount ? step : loopSteps - step;
      const column = frame % 5;
      const row = Math.floor(frame / 5);
      sprite.style.backgroundPosition = `${-column * 300}px ${-row * 250}px`;
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
  gsap.to("#final-cta", 0.2, { scale: 1.1, ease: "power1.inOut", overwrite: "auto" });
}

function defaultOut() {
  if (tl.progress() < 1) return;
  gsap.to("#final-cta", 0.2, { scale: 1, ease: "power1.inOut", overwrite: "auto" });
}


function logDuration() {
  let endTime = new Date();
  console.log(
    "Animation duration: " +
    ((endTime - startTime) / 1000).toFixed(2) +
    " seconds",
  );
}
