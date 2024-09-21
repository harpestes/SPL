"use strict";
function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}
function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}
function scaleImage(imageId) {
    var image = document.getElementById(imageId);
    if (image) {
        image.addEventListener('mouseenter', function () {
            image.style.transform = "scale(1.3, 1.3)";
        });
        image.addEventListener('mouseleave', function () {
            image.style.transform = "scale(1, 1)";
        });
    }
}
document.addEventListener('DOMContentLoaded', function () {
    var modalButton = document.getElementById('modalButton');
    if (modalButton) {
        modalButton.addEventListener('click', function () { return openModal('myModal'); });
    }
    var closeButton = document.getElementById('closeModal');
    if (closeButton) {
        closeButton.addEventListener('click', function () { return closeModal('myModal'); });
    }
    for (var i = 1; i <= 4; i++) {
        scaleImage("img".concat(i));
    }
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(function (response) { return response.json(); })
        .then(function (data) {
        var usersContainer = document.getElementById('users_container');
        var i = 0;
        if (usersContainer) {
            data.forEach(function (user) {
                if (i < 3) {
                    i++;
                }
                else {
                    i = 1;
                }
                var userDiv = document.createElement('div');
                userDiv.className = 'col-lg-4 col-md-6 mx-auto';
                userDiv.innerHTML = "\n                        <div class=\"box\">\n                            <div class=\"name\">\n                                <h5>".concat(user.name, "</h5><br>\n                                <h5>email: ").concat(user.email, "</h5>\n                            </div>\n                            <div class=\"img-box\">\n                                <img src=\"../images/t").concat(i, ".jpg\" alt=\"\">\n                            </div>\n                            <div class=\"social_box\">\n                                <a href=\"https://www.free-css.com/free-css-templates\">\n                                    <img src=\"../images/facebook-logo.png\" alt=\"\">\n                                </a> \n                                <a href=\"https://www.free-css.com/free-css-templates\">\n                                    <img src=\"../images/twitter.png\" alt=\"\">\n                                </a> \n                                <a href=\"https://www.free-css.com/free-css-templates\">\n                                    <img src=\"../images/instagram-logo.png\" alt=\"\">\n                                </a>\n                            </div>\n                        </div>\n                    ");
                usersContainer.appendChild(userDiv);
            });
        }
    });
});
