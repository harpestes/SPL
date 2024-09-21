function openModal(modalId: string): void {
    const modal: HTMLElement | null = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal(modalId: string): void {
    const modal: HTMLElement | null = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

function scaleImage(imageId: string): void {
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


    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(data => {
            const usersContainer: HTMLElement | null = document.getElementById('users_container');
            let i: number = 0;
            if (usersContainer) {
                data.forEach((user: { id: number; name: string; email: string }): void => {
                    if (i < 3) {
                        i++;
                    }
                    else {
                        i = 1;
                    }
                    const userDiv: HTMLDivElement = document.createElement('div');
                    userDiv.className = 'col-lg-4 col-md-6 mx-auto';
                    userDiv.innerHTML = `
                        <div class="box">
                            <div class="name">
                                <h5>${user.name}</h5><br>
                                <h5>email: ${user.email}</h5>
                            </div>
                            <div class="img-box">
                                <img src="https://www.siwc.ca/wp-content/uploads/2019/03/Alluri_AuthorPhotoSoft_by_Erik_Haensel-scaled-370x390.jpg" alt="">
                            </div>
                        </div>
                    `;
                    usersContainer.appendChild(userDiv);
                });
            }
        });
});
