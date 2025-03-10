class Projects {
    constructor(projects, parent) {
        this.render(parent);
    }
    render(parent) {
    //     <div class="card">
    //     <div class="card-header">
    //       <h3 class="card-title">Recent Projects</h3>
    //     </div>
        
    //     <ul class="project-list">
    //       <li class="project-item">
    //         <div class="project-icon">📱</div>
    //         <div class="project-info">
    //           <div class="project-name">Flutter Mobile App</div>
    //           <div class="project-path">/madere/div-01/flutter-app</div>
    //         </div>
    //         <div class="project-grade grade-pass">PASS</div>
    //       </li>
          
    //       <li class="project-item">
    //         <div class="project-icon">📄</div>
    //         <div class="project-info">
    //           <div class="project-name">GraphQL</div>
    //           <div class="project-path">/madere/div-01/graphql</div>
    //         </div>
    //         <div class="project-grade grade-pass">PASS</div>
    //       </li>
          
    //       <li class="project-item">
    //         <div class="project-icon">🌐</div>
    //         <div class="project-info">
    //           <div class="project-name">Golang API Service</div>
    //           <div class="project-path">/madere/div-01/golang-api</div>
    //         </div>
    //         <div class="project-grade grade-pass">PASS</div>
    //       </li>
          
    //       <li class="project-item">
    //         <div class="project-icon">🔍</div>
    //         <div class="project-info">
    //           <div class="project-name">JavaScript Frontend</div>
    //           <div class="project-path">/madere/div-01/js-frontend</div>
    //         </div>
    //         <div class="project-grade grade-fail">FAIL</div>
    //       </li>
    //     </ul>
    //   </div>

        const card = document.createElement('div');
        card.classList.add('card');

        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');
        const cardTitle = document.createElement('h3');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = 'Recent Projects';
        cardHeader.appendChild(cardTitle);
        card.appendChild(cardHeader);

        const projectList = document.createElement('ul');
        projectList.classList.add('project-list');

        const projectItems = [
            { icon: '📱', name: 'Flutter Mobile App', path: '/madere/div-01/flutter-app', grade: 'PASS' },
            { icon: '📄', name: 'GraphQL', path: '/madere/div-01/graphql', grade: 'PASS' },
            { icon: '🌐', name: 'Golang API Service', path: '/madere/div-01/golang-api', grade: 'PASS' },
            { icon: '🔍', name: 'JavaScript Frontend', path: '/madere/div-01/js-frontend', grade: 'FAIL' },
        ];

        projectItems.forEach(item => {
            const projectItem = document.createElement('li');
            projectItem.classList.add('project-item');

            const projectIcon = document.createElement('div');
            projectIcon.classList.add('project-icon');
            projectIcon.textContent = item.icon;
            projectItem.appendChild(projectIcon);

            const projectInfo = document.createElement('div');
            projectInfo.classList.add('project-info');

            const projectName = document.createElement('div');
            projectName.classList.add('project-name');
            projectName.textContent = item.name;
            projectInfo.appendChild(projectName);

            const projectPath = document.createElement('div');
            projectPath.classList.add('project-path');
            projectPath.textContent = item.path;
            projectInfo.appendChild(projectPath);

            projectItem.appendChild(projectInfo);

            const projectGrade = document.createElement('div');
            projectGrade.classList.add('project-grade', `grade-${item.grade.toLowerCase()}`);
            projectGrade.textContent = item.grade;
            projectItem.appendChild(projectGrade);

            projectList.appendChild(projectItem);
        });

        card.appendChild(projectList);

        parent.appendChild(card);
    }
}

export {Projects};