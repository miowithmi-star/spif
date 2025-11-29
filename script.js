const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const dotsContainer = document.querySelector('.dots');

let index = 0;

/* создаём точки */
slides.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dotsContainer.append(dot);
});

/* обновляем точки */
function updateDots(i) {
    dotsContainer.children[index].classList.remove('active');
    dotsContainer.children[i].classList.add('active');
}

/* двигаем слайд */
function moveSlide(i) {
    i = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${i * 100}%)`;
    updateDots(i);
    index = i;
}

document.querySelector('.next').onclick = () => moveSlide(index + 1);
document.querySelector('.prev').onclick = () => moveSlide(index - 1);

/* автопрокрутка */
setInterval(() => moveSlide(index + 1), 4000);

/* свайп */
let startX = 0;
track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
track.addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 40) moveSlide(index + 1);
    if (endX - startX > 40) moveSlide(index - 1);
});

/* fullscreen */
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalClose = document.getElementById("modalClose");

slides.forEach(img => {
    img.onclick = () => {
        modal.style.display = "flex";
        modalImg.src = img.src;
    };
});

modalClose.onclick = () => modal.style.display = "none";
modal.onclick = e => {
    if (e.target === modal) modal.style.display = "none";
};
