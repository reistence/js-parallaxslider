const imgs = [
  "./imgs/paint_fluid_art_stains_179700_3840x2400.jpg",
  "./imgs/paint_fluid_art_stains_181136_3840x2400.jpg",
  "./imgs/paint_fluid_art_stains_181255_3840x2400.jpg",
  "./imgs/paint_liquid_fluid_art_174351_3840x2400.jpg",
  "./imgs/paint_liquid_fluid_art_175385_3840x2400.jpg",
  "./imgs/paint_liquid_fluid_art_177787_3840x2400.jpg",
  "./imgs/paint_liquid_fluid_art_178075_3840x2400-1.jpg",
];

//main
const main = document.querySelector(".main");
//thumbnail
const track = document.getElementById("image-track");
// console.log(track);

const handleOnDown = (e) => (track.dataset.mouseDownAt = e.clientX);

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = (e) => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("thumb-image")) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

//track movements
window.onmousedown = (e) => handleOnDown(e);

window.ontouchstart = (e) => handleOnDown(e.touches[0]);

window.onmouseup = (e) => handleOnUp(e);

window.ontouchend = (e) => handleOnUp(e.touches[0]);

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);

//display images
for (let index = 0; index < imgs.length; index++) {
  const currentImage = imgs[index];

  const element = ` <img
        class="main-image"
        src="${currentImage}"
        draggable="false"
      />`;

  const thumbImage = ` <img
        class="thumb-image"
        src="${currentImage}"
        draggable="false"
      />`;

  main.innerHTML += element;
  track.innerHTML += thumbImage;
}

//starting point
let currentIndex = 0;
const mainImages = document.getElementsByClassName("main-image");
const thumbImages = document.getElementsByClassName("thumb-image");

mainImages[currentIndex].classList.add("active");

//Thumbnail imgs nav
for (let index = 0; index < thumbImages.length; index++) {
  const thisThumb = thumbImages[index];

  thisThumb.addEventListener("click", function () {
    mainImages[currentIndex].classList.remove("active");
    currentIndex = index;
    mainImages[currentIndex].classList.add("active");
  });
}
