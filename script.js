document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
const slideshowContainer = document.querySelector('.slideshow-images');
let index = 0;

function slideShow() {
  index++;
  if (index >= slideshowContainer.children.length) {
    index = 0;
  }
  slideshowContainer.style.transform = `translateX(-${index * 200}px)`;
}

setInterval(slideShow, 1000); // 1 second interval for fast slideshow
