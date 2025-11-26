class App {
    constructor(){
        this.projects = {};

        this.projectContainer = document.getElementById('project-container');
        this.filterContainer = document.getElementById('filter-container');
        this.anyToggle = document.querySelector('.any-toggle');

        this.router = new HistoryManager();
        this.router
            .register('/', () => this.displayHome())
            .register('/project', (query) => this.displayProject(query.params.id))

        this.init();
    }

    init(){
        Promise.all(activeProjects.map(async projectId => {
            this.projects[projectId] = await parseYamlFile(`assets/projects/${projectId}.yaml`);
        })).then(() => {
            this.loadFilters();
            this.displayProjects(activeProjects);
        })
    }

    loadFilters(){
        const tags = getUniqueTagsFlat(Object.values(this.projects))
        tags.forEach(t => {
            const filter = buildFilter(t);
            this.filterContainer.appendChild(filter);

            filter.addEventListener('click', (e) =>{
                e.target.dataset.active = e.target.dataset.active == "false" ? "true" : "false";
                this.applyFilters();
            });
        });

        this.anyToggle.addEventListener('change', () => this.applyFilters());
    }

    applyFilters(){
        const activeFilters = Array.from(this.filterContainer.querySelectorAll('.filter[data-active="true"]'))
            .map(filter => ({
                category: Array.from(filter.classList).find(c => c !== 'filter'),
                name: filter.innerText
            }));

        const matchAny = this.anyToggle.checked;
        const filteredIds = filterProjectsByTags(this.projects, activeFilters, matchAny);
        this.displayProjects(filteredIds);
    }

    displayProjects(projectIdList){
        this.projectContainer.innerHTML = "";
        projectIdList.forEach(id => {
            const project = this.projects[id];
            const card = buildProjectCard(project);
            this.projectContainer.appendChild(card);

            card.addEventListener('mouseenter', (e) => {
                card.firstElementChild.src = `assets/gifs/${id}.gif`
            });
            card.addEventListener('mouseleave', (e) => {
                card.firstElementChild.src = `assets/images/backgrounds/${id}-bg.png`
            });
        });
    }

    displayHome(){

    }

    displayProject(projectId){

    }
}

const app = new App();