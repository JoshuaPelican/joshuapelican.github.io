let activeIndex = 0;

const articles = document.getElementsByClassName("article");

let currentArticle = document.querySelector('[data-status="active"]');
let nextArticle = null;

const handleClickDirect = (i) => {

    if (i == activeIndex) {
        return;
    }

    nextIndex = i;

    const dirIsRight = i > activeIndex;
    if (dirIsRight) {
        currentArticle = document.querySelector('[data-index="' + activeIndex + '"]');
        nextArticle = document.querySelector('[data-index="' + nextIndex + '"]');

        currentArticle.dataset.status = "before";
        document.querySelectorAll('[data-index="' + activeIndex + '"]')[1].dataset.status = "inactive";
        nextArticle.dataset.status = "becoming-active-from-before"

        setTimeout(() => {
            nextArticle.dataset.status = "active";
            document.querySelectorAll('[data-index="' + nextIndex + '"]')[1].dataset.status = "active";
            activeIndex = nextIndex;
        });
    }
    else {
        currentArticle = document.querySelector('[data-index="' + activeIndex + '"]');
        nextArticle = document.querySelector('[data-index="' + nextIndex + '"]');

        currentArticle.dataset.status = "after";
        document.querySelectorAll('[data-index="' + activeIndex + '"]')[1].dataset.status = "inactive";
        nextArticle.dataset.status = "becoming-active-from-after";

        setTimeout(() => {
            nextArticle.dataset.status = "active";
            document.querySelectorAll('[data-index="' + nextIndex + '"]')[1].dataset.status = "active";
            activeIndex = nextIndex;
        });
    }


}

const handleClickLeft = () => {
    const nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : articles.length - 1;

    currentArticle = document.querySelector('[data-index="' + activeIndex + '"]');
    nextArticle = document.querySelector('[data-index="' + nextIndex + '"]');

    currentArticle.dataset.status = "after";
    document.querySelectorAll('[data-index="' + activeIndex + '"]')[1].dataset.status = "inactive";
    nextArticle.dataset.status = "becoming-active-from-after";

    setTimeout(() => {
        nextArticle.dataset.status = "active";
        document.querySelectorAll('[data-index="' + nextIndex + '"]')[1].dataset.status = "active";
        activeIndex = nextIndex;
    });
}

const handleClickRight = () => {
    const nextIndex = activeIndex + 1 <= articles.length - 1 ? activeIndex + 1 : 0;

    currentArticle = document.querySelector('[data-index="' + activeIndex + '"]');
    nextArticle = document.querySelector('[data-index="' + nextIndex + '"]');

    currentArticle.dataset.status = "before";
    document.querySelectorAll('[data-index="' + activeIndex + '"]')[1].dataset.status = "inactive";
    nextArticle.dataset.status = "becoming-active-from-before";

    setTimeout(() => {
        nextArticle.dataset.status = "active";
        document.querySelectorAll('[data-index="' + nextIndex + '"]')[1].dataset.status = "active";
        activeIndex = nextIndex;
    });
}