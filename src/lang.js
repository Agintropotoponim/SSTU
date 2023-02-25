const changeLang = () => {

    const $lang = document.querySelector('#lang');
    let str = $lang.textContent;
    if ($lang.textContent == "RU") {
        $lang.textContent = "EN";
        const $img = document.querySelector('#lang_img');
        $img.src = "assets/img/uk.png";
    }
    else if (str == "EN") {
        $lang.textContent = "RU";
        const $img = document.querySelector('#lang_img');
        $img.src = "assets/img/ru.png";
    }

}