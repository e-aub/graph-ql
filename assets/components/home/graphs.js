class Graphs {
    constructor(userData, parent) {
        this.render(parent);
    }


    render(parent) {
    //     <section class="graph-section">
    //     <h2 class="section-title">Statistics</h2>
        
    //     <div class="grid-container">
    //       <div class="graph-container">
    //         <div class="card-header">
    //           <h3 class="card-title">XP Progress Over Time</h3>
    //         </div>
    //         <div class="graph-placeholder">
    //           SVG Graph will be placed here
    //         </div>
    //       </div>
          
    //       <div class="graph-container">
    //         <div class="card-header">
    //           <h3 class="card-title">Skills</h3>
    //         </div>
    //         <div class="graph-placeholder">
    //           SVG Graph will be placed here
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    const graphSection = document.createElement('section');
    graphSection.classList.add('graph-section');

    const sectionTitle = document.createElement('h2');
    sectionTitle.classList.add('section-title');
    sectionTitle.textContent = 'Statistics';
    graphSection.appendChild(sectionTitle);

    const gridContainer = document.createElement('div');
    gridContainer.classList.add('graphs-container');

    const graphContainer1 = document.createElement('div');
    graphContainer1.classList.add('graph-container');

    const cardHeader1 = document.createElement('div');
    cardHeader1.classList.add('card-header');

    const cardTitle1 = document.createElement('h3');
    cardTitle1.classList.add('card-title');
    cardTitle1.textContent = 'XP Progress Over Time';
    cardHeader1.appendChild(cardTitle1);

    const graphPlaceholder1 = document.createElement('div');
    graphPlaceholder1.classList.add('graph-placeholder');
    graphPlaceholder1.textContent = 'SVG Graph will be placed here';

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
    graphPlaceholder2.textContent = 'SVG Graph will be placed here';

    graphContainer2.appendChild(cardHeader2);
    graphContainer2.appendChild(graphPlaceholder2);

    gridContainer.appendChild(graphContainer1);
    gridContainer.appendChild(graphContainer2);

    graphSection.appendChild(gridContainer);

    parent.appendChild(graphSection);
    }
}

export {Graphs};