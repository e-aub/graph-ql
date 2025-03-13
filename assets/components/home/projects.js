import { formatBytes } from "/assets/utils.js";

class ProjectsGraph {
    constructor(projects, parent) {
        this.render(projects, parent);
    }

    render(projects, parent) {
        const totalProjectsXp = projects.reduce((total, project) => total + project.amount, 0);
        const projectsCount = projects.length;
        const x = 650;
        const y = 290;

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 800 500");
        svg.style.width = "100%";
        svg.style.height = "auto";
        parent.appendChild(svg);

        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        group.setAttribute("transform", "translate(0,20)");
        svg.appendChild(group);

        // X and Y axes
        const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
        xAxis.setAttribute("x1", "100");
        xAxis.setAttribute("y1", "290");
        xAxis.setAttribute("x2", `${x + 100}`);
        xAxis.setAttribute("y2", "290");
        xAxis.setAttribute("stroke", "black");
        xAxis.setAttribute("stroke-width", "2");
        group.appendChild(xAxis);

        const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
        yAxis.setAttribute("x1", "100");
        yAxis.setAttribute("y1", "0");
        yAxis.setAttribute("x2", "100");
        yAxis.setAttribute("y2", `${y}`);
        yAxis.setAttribute("stroke", "black");
        yAxis.setAttribute("stroke-width", "2");
        group.appendChild(yAxis);

        const maxProjectXp = Math.max(...projects.map(project => project.amount));
        const tickInterval = Math.ceil(maxProjectXp / 15 / 100) * 100; 
        const numTicks = Math.ceil(maxProjectXp / tickInterval);

        // Add y-axis ticks and labels
        for (let i = 0; i <= numTicks; i++) {
            const tickValue = i * tickInterval;
            const tickY = 290 - (tickValue / maxProjectXp) * y;

            const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
            tick.setAttribute("x1", "95");
            tick.setAttribute("y1", `${tickY}`);
            tick.setAttribute("x2", "100");
            tick.setAttribute("y2", `${tickY}`);
            tick.setAttribute("stroke", "black");
            tick.setAttribute("stroke-width", "2");
            group.appendChild(tick);

            const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
            label.setAttribute("x", "80");
            label.setAttribute("y", `${tickY + 5}`);
            label.setAttribute("fill", "black");
            label.setAttribute("font-size", "12px");
            label.setAttribute("text-anchor", "end");
            label.textContent = formatBytes(tickValue);
            group.appendChild(label);
        }

        // Render bars
        const xGap = x / projectsCount;
        let accumulatedX = 1;

        for (let i = 0; i < projectsCount; i++) {
            const project = projects[i];
            const projectXp = project.amount;
            const color = `hsl(${(i * 20) % 360}, 70%, 50%)`
            const projectPercentage = ((projectXp / maxProjectXp) * y);

            const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            bar.setAttribute("x", `${100 + accumulatedX}`);
            bar.setAttribute("y", `${y - projectPercentage}`);
            bar.setAttribute("width", xGap);
            bar.setAttribute("fill", color);
            accumulatedX += xGap;
            bar.setAttribute("height", `${projectPercentage}`);
            const projectName = document.createElementNS("http://www.w3.org/2000/svg", "text");
            projectName.setAttribute("x", `${100 + accumulatedX - (xGap/2)}`);
            projectName.setAttribute("y", `${y+10}`);
            projectName.setAttribute("fill", color);
            projectName.setAttribute("font-size", "12px");
            projectName.setAttribute("text-anchor", "end");
            projectName.setAttribute("transform", `rotate(-85, ${100 + accumulatedX - (xGap/2)}, ${y+10})`);
            projectName.textContent = `${project.path.split("/")[3]} :${formatBytes(project.amount)}`;
            group.appendChild(projectName);
            group.appendChild(bar);
        }
    }
}

export { ProjectsGraph };
