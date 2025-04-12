// Get all tags and cards
const tags = document.querySelectorAll('.tag');
const cards = document.querySelectorAll('.card');
const filters = [];

// Create a set to store the unique tags
const uniqueTags = [];


// Populate the set with the unique tags
tags.forEach(tag => {
  if(uniqueTags.every(t => t.textContent != tag.textContent))
    uniqueTags.push(tag);
});

uniqueTags.sort((x, y) => x.classList[1].localeCompare(y.classList[1]));

console.log(uniqueTags[0].classList[1]);

// Get the filter container
const filterContainer = document.querySelector('.filter-container');

// Any toggle
const anyToggle = document.querySelector('.any-toggle');
anyToggle.addEventListener('change', filterCards)

// Create a checkbox for each unique tag
uniqueTags.forEach(tag => {
  const filter = document.createElement('li');
  filter.classList.add('tag', tag.classList[1].toLowerCase(), 'filter');
  filter.textContent = tag.textContent;
  filter.setAttribute('data-active', 'false');

  filterContainer.appendChild(filter);
  filters.push(filter);
});

function toggleFilter(event){
  const isActive = event.target.getAttribute('data-active') == "true" ? "false" : "true";
  event.target.setAttribute('data-active', isActive);
}

// Function to filter the cards based on the selected tags
function filterCards() {
  // Get the selected tags
  const selectedTags = Array.from(document.querySelectorAll('.filter-container .filter[data-active = true]')).map(filter => filter.textContent);
  // Filter the cards
  cards.forEach(card => {
    if(selectedTags.length == 0)
      card.classList.remove('hidden');
    else{
      const cardTags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent);
      const isVisible = anyToggle.checked ? selectedTags.some(tag => cardTags.includes(tag)) : selectedTags.every(tag => cardTags.includes(tag));
      isVisible ? card.classList.remove('hidden') : card.classList.add('hidden');
    }
    });
  window.history.replaceState(null, '', window.location.pathname + '?filters=' + selectedTags.map(s => s.toLowerCase()).join(',') + '&any='+ anyToggle.checked);
}

// Add event listeners to the checkboxes
document.querySelectorAll('.filter-container li').forEach(filter => {
  filter.addEventListener('click', (event) => {toggleFilter(event); filterCards()});
});

const url = window.location;
const params = url.search.replace('?','').split('&');
params.forEach(param =>{
  if(param.startsWith("filters"))
  {
    param = param.replace('filters=', '').replaceAll('%20', " ");
    const filterParams = param.split(',').filter(x => x);
    console.log(filterParams);
    filters.forEach(filter =>{
      if(filterParams.includes(filter.textContent.toLowerCase()))
        filter.setAttribute('data-active', 'true');
    })
  }
  else if(param.startsWith('any')){
    param = param.replace('any=', '');
    anyToggle.checked = param == 'true' ? true : false;
  }
})

filterCards()