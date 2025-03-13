import { formatBytes } from "/assets/utils.js";

class Overview {
    constructor(userData, parent) {
        this.userData = userData;
        this.parent = parent;
        this.render();
    }


    render() {
        const stats = [
            { label: 'Current rank', value: this.userData["rank"] },
            { label: 'Total XP', value: formatBytes(this.userData["xp"]) },
            { label: 'Audit Ratio', value: this.userData["auditRatio"]},
        ]
        const gridContainer = document.createElement('div');
        gridContainer.classList.add('grid-container');
      
        stats.forEach(stat => {
          const card = document.createElement('div');
          card.classList.add('card', 'stat-card');
      
          const label = document.createElement('span');
          label.classList.add('stat-label');
          label.textContent = stat.label;
          card.appendChild(label);
      
          const value = document.createElement('div');
          value.classList.add('stat-value');
          value.textContent = stat.value;
          card.appendChild(value);
      
          if (stat.extra) {
            const trend = document.createElement('span');
            trend.classList.add('stat-trend');
            trend.textContent = stat.extra;
            card.appendChild(trend);
          }
      
          gridContainer.appendChild(card);
        });
      
        this.parent.appendChild(gridContainer);
      }
      
      
}

export { Overview };