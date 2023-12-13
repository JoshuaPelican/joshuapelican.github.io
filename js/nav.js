let activeIndex = 0;

const articles = document.getElementsByClassName("article");

const handleClickDirect = (i) => {

    nextIndex = i;

    const dirIsRight = i > activeIndex;
    if(dirIsRight){
        const currentArticle = document.querySelector('[data-index="'+activeIndex+'"]'),
        nextArticle = document.querySelector('[data-index="'+nextIndex+'"]');
    
        currentArticle.dataset.status = "before";
        nextArticle.dataset.status = "becoming-active-from-before"
        
        setTimeout(() =>{
            nextArticle.dataset.status = "active";
            activeIndex = nextIndex;
        });
    }
    else{
        const currentArticle = document.querySelector('[data-index="'+activeIndex+'"]'),
        nextArticle = document.querySelector('[data-index="'+nextIndex+'"]');
        
        currentArticle.dataset.status = "after";
        nextArticle.dataset.status = "becoming-active-from-after"
        
        setTimeout(() =>{
            nextArticle.dataset.status = "active";
            activeIndex = nextIndex;
        });
    }


}

const handleClickLeft = () =>{
    const nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : articles.length - 1;

    const currentArticle = document.querySelector('[data-index="'+activeIndex+'"]'),
    nextArticle = document.querySelector('[data-index="'+nextIndex+'"]');

    currentArticle.dataset.status = "after";
    nextArticle.dataset.status = "becoming-active-from-after"
    
    setTimeout(() =>{
        nextArticle.dataset.status = "active";
        activeIndex = nextIndex;
    });
}

const handleClickRight = () =>{
    const nextIndex = activeIndex + 1 <= articles.length - 1 ? activeIndex + 1 : 0;

    const currentArticle = document.querySelector('[data-index="'+activeIndex+'"]'),
    nextArticle = document.querySelector('[data-index="'+nextIndex+'"]');

    currentArticle.dataset.status = "before";
    nextArticle.dataset.status = "becoming-active-from-before"
    
    setTimeout(() =>{
        nextArticle.dataset.status = "active";
        activeIndex = nextIndex;
    });
}