
let activeIndex = 0;

const pages = document.getElementsByClassName("page");

let currentPage = document.querySelector('[data-status="active"]');
let nextPage = null;
let backBool = false;

const handleClickDirect = (i) => {

    if (i == activeIndex) {
        return;
    }

    nextIndex = i;

    const dirIsRight = i > activeIndex;
    if (dirIsRight) {
        currentPage = document.querySelector('[data-index="' + activeIndex + '"]');
        nextPage = document.querySelector('[data-index="' + nextIndex + '"]');

        currentPage.dataset.status = "before";
        document.querySelectorAll('[data-index="' + activeIndex + '"]')[1].dataset.status = "inactive";
        nextPage.dataset.status = "becoming-active-from-before"

        setTimeout(() => {
            nextPage.dataset.status = "active";
            document.querySelectorAll('[data-index="' + nextIndex + '"]')[1].dataset.status = "active";
            backgroundFade(nextPage.id);
            activeIndex = nextIndex;
        });
    }
    else {
        currentPage = document.querySelector('[data-index="' + activeIndex + '"]');
        nextPage = document.querySelector('[data-index="' + nextIndex + '"]');

        currentPage.dataset.status = "after";
        document.querySelectorAll('[data-index="' + activeIndex + '"]')[1].dataset.status = "inactive";
        nextPage.dataset.status = "becoming-active-from-after";

        setTimeout(() => {
            nextPage.dataset.status = "active";
            document.querySelectorAll('[data-index="' + nextIndex + '"]')[1].dataset.status = "active";
            backgroundFade(nextPage.id);
            activeIndex = nextIndex;
        });
    }


}

const handleClickLeft = () => {
    const nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : pages.length - 1;

    currentPage = document.querySelector('[data-index="' + activeIndex + '"]');
    nextPage = document.querySelector('[data-index="' + nextIndex + '"]');

    currentPage.dataset.status = "after";
    document.querySelectorAll('[data-index="' + activeIndex + '"]')[1].dataset.status = "inactive";
    nextPage.dataset.status = "becoming-active-from-after";

    setTimeout(() => {
        nextPage.dataset.status = "active";
        document.querySelectorAll('[data-index="' + nextIndex + '"]')[1].dataset.status = "active";
        backgroundFade(nextPage.id);
        activeIndex = nextIndex;
    });
}

const handleClickRight = () => {
    const nextIndex = activeIndex + 1 <= pages.length - 1 ? activeIndex + 1 : 0;

    currentPage = document.querySelector('[data-index="' + activeIndex + '"]');
    nextPage = document.querySelector('[data-index="' + nextIndex + '"]');

    currentPage.dataset.status = "before";
    document.querySelectorAll('[data-index="' + activeIndex + '"]')[1].dataset.status = "inactive";
    nextPage.dataset.status = "becoming-active-from-before";

    setTimeout(() => {
        nextPage.dataset.status = "active";
        document.querySelectorAll('[data-index="' + nextIndex + '"]')[1].dataset.status = "active";
        backgroundFade(nextPage.id);
        activeIndex = nextIndex;
    });
}

const backgroundFade = (backName) => {
    const backgrounds = document.getElementsByClassName("background");

    backBool = !backBool;

    const i = backBool ? 1 : 0;
    const j = backBool ? 0 : 1;

    backgrounds[i].classList.add("transition-src");
    backgrounds[j].src = "images/backgrounds/" + backName + "-bg.png";
    backgrounds[j].classList.remove("transition-src");
}