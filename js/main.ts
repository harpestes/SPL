import { openModal, closeModal } from './modules/modal.js';
import { scaleImage } from './modules/image.js';
import { fetchAndDisplayUsers } from './modules/fetchUsers.js';

document.addEventListener('DOMContentLoaded', (): void => {
    const modalButton: HTMLElement | null = document.getElementById('modalButton');
    if (modalButton) {
        modalButton.addEventListener('click', () => openModal('myModal'));
    }

    const closeButton: HTMLElement | null = document.getElementById('closeModal');
    if (closeButton) {
        closeButton.addEventListener('click', () => closeModal('myModal'));
    }

    for (let i: number = 1; i <= 4; i++) {
        scaleImage(`img${i}`);
    }

    fetchAndDisplayUsers('users_container');
});
