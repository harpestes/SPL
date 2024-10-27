export function scaleImage(imageId: string): void {
    const image: HTMLElement | null = document.getElementById(imageId);
    if (image) {
        image.addEventListener('mouseenter', (): void => {
            image.style.transform = "scale(1.3, 1.3)";
        });
        image.addEventListener('mouseleave', (): void => {
            image.style.transform = "scale(1, 1)";
        });
    }
}
