const myModal = document.getElementById('write-reviews__modal')
const btnShowModal = document.getElementById('write-reviews__btn')

myModal.addEventListener('shown.bs.modal', () => {
    btnShowModal.focus()
})

function send(event, php){
    console.log("Отправка запроса");
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var req = new XMLHttpRequest();
    req.open('POST', php, true);
    req.onload = function() {
        if (req.status >= 200 && req.status < 400) {
            json = JSON.parse(this.response); // Ебанный internet explorer 11
            console.log(json);

            // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
            if (json.result == "success") {
                // Если сообщение отправлено
                alert("Сообщение отправлено");
                document.querySelector('.btn-close').click();
            } else {
                // Если произошла ошибка
                alert(`Ошибка. Сообщение не отправлено ${req.status}`);
            }
            // Если не удалось связаться с php файлом
        } else {alert("Ошибка сервера. Номер: "+req.status);}};

// Если не удалось отправить запрос. Стоит блок на хостинге
    req.onerror = function() {alert("Ошибка отправки запроса");};
    req.send(new FormData(event.target));
}

const showMore = () => {
    const btnShowMore = document.querySelector('.show-more__btn');
    const blocks = document.querySelectorAll('.reviews-row');

    for(let i = 7; i < blocks.length; i++) {
        blocks[i].style.display = "none";
    }

    let count = 7;

    btnShowMore.addEventListener('click', e => {
        count += 7;
        if(count <= blocks.length) {
            for(let i = 0; i < count; i++) {
                blocks[i].style.display = 'flex';
            }
        } else if(count >= blocks.length) {
            btnShowMore.style.display = "none";
        }
    })
}

const fileUploadTextChange = () => {
    const formFileWrapper = document.querySelector('.form-file');
    const fileInput = formFileWrapper.querySelector('input');
    const formFileBtn = formFileWrapper.querySelector('.form-file__btn');

    fileInput.addEventListener('change', function () {
        if(this.files[0]) {
            formFileBtn.textContent = this.files[0].name;
        } else {
             formFileBtn.textContent = 'Выберите файл';
        }
    })
}

const hoverRating = () => {
    const ratingWrapper = document.querySelector('.form-rating__wrapper');
    const ratingItems = ratingWrapper.querySelectorAll('.label-rating');

    ratingWrapper.addEventListener('mousemove', e => {
        const target = e.target;

        ratingItems.forEach((item, i) => {
            if(target == item.querySelector('svg') || target == item.querySelector('use')) {
                target.closest('.label-rating').classList.add('hover');
                ratingItems.forEach((star, j) => {
                    if(j < i) {
                        star.classList.add('hover')
                    } else if( j > i ) {
                        star.classList.remove('hover')
                    }
                })
            }
        })
    })
    ratingWrapper.addEventListener('mouseleave', e => {
        ratingItems.forEach(item => {
            item.classList.remove('hover');
        })
    })
    ratingWrapper.addEventListener('click', e => {
        const target = e.target;
        if(target.closest('.label-rating')) {
            ratingItems.forEach(item => {
                item.classList.remove('active');
            })
            target.closest('.label-rating').classList.add('active');

            ratingItems.forEach((item, i) => {
                if(ratingItems[i] == target.closest('.label-rating')) {
                    ratingItems.forEach((star, j) => {
                        if( j < i) {
                            star.classList.add('active');
                        }
                    })
                }
            })
        }
    })
}
hoverRating();
fileUploadTextChange();
showMore();