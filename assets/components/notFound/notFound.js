import { router } from "/assets/script.js";

class NotFound {
    constructor() {
        document.body.innerHTML = "";
        document.querySelector("link[rel='stylesheet']").href = "/assets/styles/notFound.css";
        this.render();
    }

    render() {
        const notFound = document.createElement("div");
        notFound.classList.add("not-found");
        notFound.innerHTML = `
            <h1>404</h1>
            <p>Page not found</p>
        `;
        const goTo = document.createElement("a");
        goTo.textContent = "Go to home";
        goTo.addEventListener("click", () => {
            router.route("/");
        });
        document.body.appendChild(notFound);
        document.body.appendChild(goTo);
    }
}

export { NotFound };