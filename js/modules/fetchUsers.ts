import { User } from '../types/user';

export function fetchAndDisplayUsers(containerId: string): void {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then((data: User[]) => {
            const usersContainer: HTMLElement | null = document.getElementById(containerId);
            if (usersContainer) {
                data.forEach((user: User): void => {
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
}
