const json = {
    "projects": [
        {
            "title": "Terra Inferno",
            "file-name": "terra-inferno",
            "desc": "Terra Inferno description.",
            "tags": [
                {"cat": "tools", "label": "Unity"},
                {"cat": "code", "label": "NPC AI"},
                {"cat": "code", "label": "Pathfinding"},
                {"cat": "code", "label": "Proc Gen"},
                {"cat": "people-skills", "label": "Team Lead"},
            ]
        },
        {
            "title": "Trouble In Tornado Town",
            "file-name": "trouble-in-tornado-town",
            "desc": "Trouble In Tornado Town description.",
            "tags": [                
                {"cat": "tools", "label": "Unity"},
                {"cat": "code", "label": "NPC AI"},
                {"cat": "code", "label": "Physics"},
                {"cat": "people-skills", "label": "Team Lead"},
            ]
        },
        {
            "title": "Match Free",
            "file-name": "match-free",
            "desc": "Match Free description.",
            "tags": [
                {"cat": "tools", "label": "Unity"},
                {"cat": "code", "label": "Match-3"},
                {"cat": "art", "label": "2D Art"},
                {"cat": "people-skills", "label": "Solo"},
            ]
        }
    ]
}

const cardContainer = document.querySelector(".flex-grid");
json.projects.forEach(project =>{
    const card = document.createElement('a');
    card.classList.add("card");
    card.href = card.href;
    cardContainer.appendChild(card);
    card.innerHTML = 
       `<img src="/images/backgrounds/${project["file-name"]}-bg.png" alt="">
        <div class="hover">
          <h2>${project.title}</h2>
          <p>${project.desc}</p>
          <ul class="tags">
            ${project.tags.sort((x, y) => x.cat.localeCompare(y.cat)).map(tag =>
                `<li class="tag ${tag.cat}">${tag.label}</li>`
            ).join("\n")}
          </ul>
        </div>`

    card.addEventListener('mouseenter', function(e){
        card.firstElementChild.src = `../gifs/${project["file-name"]}.gif`
    });
    card.addEventListener('mouseleave', function(e){
        card.firstElementChild.src = `../images/backgrounds/${project["file-name"]}-bg.png`
    });

    card.addEventListener('click', function(e) {
        e.preventDefault();
        card.style.setProperty('--posX', card.offsetLeft + 'px');
        card.style.setProperty('--posY', card.offsetTop + 'px');
        card.style.setProperty('--width', card.offsetWidth + 'px')
        card.classList.add('zoom');
        document.body.style.overflow = 'none'

        setTimeout(() => {
            window.location.href = card.href;
        }, 1000)

        document.addEventListener('click', function(ev) {
            ev.preventDefault();
            ev.stopPropagation();
        }, true)
    });
})