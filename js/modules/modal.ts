export function openModal(modalId: string): void {
    const modal: HTMLElement | null = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

export function closeModal(modalId: string): void {
    const modal: HTMLElement | null = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}