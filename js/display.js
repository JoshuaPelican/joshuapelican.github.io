function buildProjectCard(project){
    const card = document.createElement('div');
    card.classList.add("card");
    //card.href = card.href;
    card.innerHTML = `
    <img src="assets/images/backgrounds/${project.id}-bg.png" alt="${project.name} cover">
    <div class="hover">
        <h2>${project.name}</h2>
        <ul class="tag-container">
            ${Object.entries(project.tags).flatMap(([category, values]) =>
                values.map(value => `<li class="tag ${category}">${value}</li>`)
            ).join("")}
        </ul>
        <p>${project.desc}</p>
    </div>
    `
    return card;
}

function buildFilter(tag){
    const chip = document.createElement('div');
    chip.innerText = tag.name;
    chip.classList.add('filter', tag.category)
    chip.dataset.active = false;
    return chip;
}