import { Login } from "./components/login/login.js";
import { Home } from "./components/home/home.js";
import { NotFound } from "./components/notFound/notFound.js";

class Router {
    constructor(routes) {
        this.routes = routes;
        this.route(window.location.pathname);
    }

    async #isAuthorized(){
        return false;
    }

    async route(path){
        const authorized = await this.#isAuthorized();
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