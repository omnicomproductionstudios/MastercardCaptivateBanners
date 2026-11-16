var tl;
var startTime;


function init() {
  startTime = new Date();
  tl = gsap.timeline({ onComplete: logDuration });
  animate();
}
gsap.config({
  force3D: true
});
function animate() {
  tl.addLabel("frame1", 0);

  // Let the opening lockup clear before revealing the next frame.
  tl.addLabel("frame2", "frame1+=2.5")
    .to([opening, story], 0.3, { autoAlpha: 0, ease: "power1.inOut" }, "frame2")
    .to("#closing", 0.4, { autoAlpha: 1, ease: "power1.inOut" })
    .to("#priceless", 0.45, { autoAlpha: 1, ease: "power1.out" }, "+=0.1");
}

function logDuration() {
  let endTime = new Date();
  console.log(
    "Animation duration: " +
    ((endTime - startTime) / 1000).toFixed(2) +
    " seconds",
  );
}
