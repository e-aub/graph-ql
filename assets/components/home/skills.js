
class SkillsGraph{
    constructor(skills, parent){
       this.render(skills, parent);
    }

  render(skills, parent){
    var skillColorMap = {
        "skill_algo": "#5E5E5E",       // Dark Gray - for general algorithms
        "skill_back-end": "#005F73",   // Deep Teal - for backend technologies
        "skill_css": "#1572B6",        // Standard CSS Blue
        "skill_docker": "#0DB7ED",     // Docker Blue
        "skill_front-end": "#FF9800",  // Bright Orange - for front-end dev
        "skill_game": "#8E44AD",       // Purple - common for game dev
        "skill_go": "#00A6D6",         // Official Go Blue
        "skill_html": "#E34F26",       // Standard HTML5 Orange
        "skill_js": "#F7E025",         // Bright JavaScript Yellow
        "skill_prog": "#9C9C9C",       // Medium Gray - for general programming
        "skill_sql": "#E38D2C",        // SQL Brown-Orange (PostgreSQL-like)
        "skill_stats": "#4CAF50",      // Green - commonly associated with data/stats
        "skill_sys-admin": "#34495E",  // Dark Blue-Grey - fits system administration
        "skill_tcp": "#0072C6",        // TCP/IP Blue
        "skill_unix": "#000"        // Unix Dark Slate Blue
    };
    
    
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 800 400");
        svg.style.width = "100%";
        svg.style.height = "auto";
        parent.appendChild(svg);

        const references = document.createElementNS("http://www.w3.org/2000/svg", "g");
        svg.appendChild(references);

        const radius = 150;
        const circumference = 2 * Math.PI * radius;
        let offset = 0;
        const skillsTotalAmount = skills.reduce((total, skill) => total + skill.amount, 0);
        let x = 450;
        let y = 0;

        skills.forEach(skill => {
            if (y > 300) {
                y = 0;
                x += 150;
            }
            y += 30;

            const color = skillColorMap[skill.type];
            const percentage = skill.amount / skillsTotalAmount;
            const dashValue = percentage * circumference;

            const reference = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            reference.setAttribute("x", `${x}`);
            reference.setAttribute("y", `${y}`);
            reference.setAttribute("width", "15");
            reference.setAttribute("height", "15");
            reference.setAttribute("fill", `${color}`);
            references.appendChild(reference);

            const referenceText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            referenceText.setAttribute("x", `${x + 20}`);
            referenceText.setAttribute("y", `${y + 10}`);
            referenceText.setAttribute("font-size", "12");
            referenceText.setAttribute("fill", "black");
            referenceText.textContent = `${skill.type} ${(percentage * 100).toFixed(2)}%`;
            references.appendChild(referenceText);

            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", "200");
            circle.setAttribute("cy", "200");
            circle.setAttribute("r", radius);
            circle.setAttribute("fill", "none");
            circle.setAttribute("stroke", `${color}`);
            circle.setAttribute("stroke-width", "50");
            circle.setAttribute("stroke-dasharray", `${dashValue} ${circumference}`);
            circle.setAttribute("stroke-dashoffset", `-${offset}`);
            svg.appendChild(circle);

            offset += dashValue;
        });
    }
}

export {SkillsGraph};