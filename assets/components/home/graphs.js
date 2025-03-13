import { SkillsGraph } from "/assets/components/home/skills.js";
import { ProjectsGraph } from "/assets/components/home/projects.js";
class Graphs {
    constructor(userData, parent) {
        this.render(userData,parent);
    }


    render(userData, parent) {
    const graphSection = document.createElement('section');
    
    graphSection.classList.add('graph-section');

    const sectionTitle = document.createElement('h2');
    sectionTitle.classList.add('section-title');
    sectionTitle.textContent = 'Statistics';
    graphSection.appendChild(sectionTitle);

    const gridContainer = document.createElement('div');
    gridContainer.classList.add('graphs-container');

    const graphContainer1 = document.createElement('div');
    graphContainer1.id = '#projects';
    graphContainer1.classList.add('graph-container');

    const cardHeader1 = document.createElement('div');
    cardHeader1.classList.add('card-header');

    const cardTitle1 = document.createElement('h3');
    cardTitle1.classList.add('card-title');
    cardTitle1.textContent = 'XP Earned By Project';
    cardHeader1.appendChild(cardTitle1);

    const graphPlaceholder1 = document.createElement('div');
    graphPlaceholder1.classList.add('graph-placeholder');

    graphContainer1.appendChild(cardHeader1);
    graphContainer1.appendChild(graphPlaceholder1);

    const graphContainer2 = document.createElement('div');
    graphContainer2.classList.add('graph-container');    

    const cardHeader2 = document.createElement('div');
    cardHeader2.classList.add('card-header');

    const cardTitle2 = document.createElement('h3');
    cardTitle2.classList.add('card-title');
    cardTitle2.textContent = 'Skills';
    cardHeader2.appendChild(cardTitle2);

    const graphPlaceholder2 = document.createElement('div');
    graphPlaceholder2.classList.add('graph-placeholder');

    graphContainer2.appendChild(cardHeader2);
    graphContainer2.appendChild(graphPlaceholder2);

    gridContainer.appendChild(graphContainer1);
    gridContainer.appendChild(graphContainer2);

    graphSection.appendChild(gridContainer);

    parent.appendChild(graphSection);

    userData["xp_and_projects"] ?  new ProjectsGraph(userData["xp_and_projects"], graphPlaceholder1) : graphPlaceholder1.textContent = "No Data";
    userData["skills"] ?new SkillsGraph(userData["skills"], graphPlaceholder2) : graphPlaceholder2.textContent = "No Data";
    }
}

export {Graphs};