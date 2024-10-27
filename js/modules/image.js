export function scaleImage(imageId) {
    const image = document.getElementById(imageId);
    if (image) {
        image.addEventListener('mouseenter', () => {
            image.style.transform = "scale(1.3, 1.3)";
        });
        image.addEventListener('mouseleave', () => {
            image.style.transform = "scale(1, 1)";
        });
    }
}
