let activeIndex = 1;

const articles = document.getElementsByClassName("article");

let currentArticle = document.querySelector('[data-status="active"]');
let nextArticle = null;

const handleClickDirect = (i) => {

    if(i == activeIndex){
        return;
    }

    nextIndex = i;

    const dirIsRight = i > activeIndex;
    if(dirIsRight){
        currentArticle = document.querySelector('[data-index="'+activeIndex+'"]');
        nextArticle = document.querySelector('[data-index="'+nextIndex+'"]');
    
        currentArticle.dataset.status = "before";
        nextArticle.dataset.status = "becoming-active-from-before"
        
        setTimeout(() =>{
            nextArticle.dataset.status = "active";
            activeIndex = nextIndex;
        });
    }
    else{
        currentArticle = document.querySelector('[data-index="'+activeIndex+'"]');
        nextArticle = document.querySelector('[data-index="'+nextIndex+'"]');
        
        currentArticle.dataset.status = "after";
        nextArticle.dataset.status = "becoming-active-from-after";
        
        setTimeout(() =>{
            nextArticle.dataset.status = "active";
            activeIndex = nextIndex;
        });
    }


}

const handleClickLeft = () =>{
    const nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : articles.length - 1;

    currentArticle = document.querySelector('[data-index="'+activeIndex+'"]');
    nextArticle = document.querySelector('[data-index="'+nextIndex+'"]');

    currentArticle.dataset.status = "after";
    nextArticle.dataset.status = "becoming-active-from-after";
    
    setTimeout(() =>{
        nextArticle.dataset.status = "active";
        activeIndex = nextIndex;
    });
}

const handleClickRight = () =>{
    const nextIndex = activeIndex + 1 <= articles.length - 1 ? activeIndex + 1 : 0;

    currentArticle = document.querySelector('[data-index="'+activeIndex+'"]');
    nextArticle = document.querySelector('[data-index="'+nextIndex+'"]');

    currentArticle.dataset.status = "before";
    nextArticle.dataset.status = "becoming-active-from-before";
    
    setTimeout(() =>{
        nextArticle.dataset.status = "active";
        activeIndex = nextIndex;
    });
}