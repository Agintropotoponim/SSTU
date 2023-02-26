const slides = ['assets/img/slider1.jpg', 'assets/img/slider2.jpg', 'assets/img/slider3.jpg'];

let counter = 0;


const changeSlide = (index, arrow) => {

    function navigate($curSlide, $box, index, arrow) {

        clearInterval(globalInterval);
        globalInterval = setInterval(changeSlide, 5000, null, 'slider__arrow__right');

        //navigation through arrows
        if (arrow) {

            $box.childNodes[counter + 1].style.backgroundColor = '#36393E';

            counter = (arrow === 'slider__arrow__left') ? counter - 1 : counter + 1;
            counter = (counter == -1) ? slides.length - 1 : counter
            counter = (counter == slides.length) ? 0 : counter

            $box.childNodes[counter + 1].style.backgroundColor = 'rgb(154, 29, 29)';
            $curSlide.src = slides[counter];
        }
        //navigation through points
        else {
            $box.childNodes[counter + 1].style.backgroundColor = '#36393E';
            counter = index;
            $box.childNodes[counter + 1].style.backgroundColor = 'rgb(154, 29, 29)';
            $curSlide.src = slides[counter];
        }

    }


    const $curSlide = document.querySelector('#slider__content');

    const $box = document.querySelector('#points')


    if (arrow === 'slider__arrow__left' || arrow === 'slider__arrow__right') {
        navigate($curSlide, $box, counter, arrow);
    }
    else {
        navigate($curSlide, $box, index);
    }

    return $box;
}


const addPoints = () => {

    const $box = document.querySelector('#points')
    $box.style.maxWidth = slides.length * 30 + 'px';

    slides.forEach(e => {
        const tmp = document.createElement('div');
        tmp.classList.add('point');
        tmp.onclick = function () {

            const index = [...this.parentNode.children].indexOf(this);

            if ($box.childNodes[index + 1].style.backgroundColor === 'rgb(154, 29, 29)') return;

            changeSlide(index);
        }

        $box.appendChild(tmp);
    });

    try {
        $box.childNodes[1].style.backgroundColor = 'rgb(154, 29, 29)';
    }
    catch {
        alert('slider has no slides');
    }
}

let globalInterval = setInterval(changeSlide, 5000, null, 'slider__arrow__right');
