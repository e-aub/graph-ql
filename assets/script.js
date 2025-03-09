import { Login } from "/assets/components/login/login.js";
import { Home } from "/assets/components/home/home.js";
import { NotFound } from "/assets/components/notFound/notFound.js";

class Router {
    constructor(routes) {
        this.routes = routes;
        this.route(window.location.pathname);
    }

    async #isAuthorized(){
        const token = localStorage.getItem("token");
        if (!token) {
            return false;
        }
        try {
        const response = await fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            }
            ,
            body: JSON.stringify({
                query: `{
                            user{
                                id
                            }
                            }`,
                 })
        })
        const data = await response.json();

        if (!response.ok){
            throw new Error(data.error);
        }
        return {userId: data, authorized: true};

        } catch (error) {
            console.log(error);
            localStorage.removeItem("token");
            return {userId: 0, authorized: false};
        }
    }

    async route(path){
        const {userId, authorized} = await this.#isAuthorized();
        console.log(userId);
        if (!authorized && path === "/") {
            path = "/login";
        }else if (authorized && path === "/login") {
            path = "/";
        }

        const route = this.routes[path];

        window.history.pushState({}, "", path);
    
        if(route){
            return new route();
        } else {
            return new NotFound();
        }
    }
}



const router = new Router({
    "/": Home,
    "/login": Login,
});