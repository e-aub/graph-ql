import { Sidebar } from "/assets/components/home/sidebar.js";
import { Overview } from "/assets/components/home/overview.js";
import { Graphs } from "/assets/components/home/graphs.js";
class Home {
    constructor(router) {
        this.router = router;
        document.querySelector("link[rel='stylesheet']").href = "/assets/styles/home.css";
        document.body.innerHTML = "";
        this.userData = null;
        this.render();
    }

    async render() {
        this.userData = await this.getData();
        this.userData["user"][0]["rank"] = this.getRankFromLevel(this.userData["user"][0]["level"][0]["amount"]);
        this.userData["user"][0]["xp"] = this.userData["user"][0]["total_xp"]["aggregate"]["sum"]["amount"];
        this.userData["user"][0]["auditRatio"] = Math.round(this.userData["user"][0]["auditRatio"] * 10) / 10;
        const appContainer = document.createElement("div");
        new Sidebar(this.userData["user"][0], appContainer);
        appContainer.classList.add("app-container");
        const main = document.createElement("main");
        main.classList.add("main-content");
        
        appContainer.appendChild(main);

        new Overview(this.userData["user"][0], main);
        new Graphs(this.userData["user"][0], main);
        document.body.appendChild(appContainer);
    }

    getRankFromLevel(level) {
        if (level >= 0 && level < 10) {
            return "Aspiring developer";
        } else if (level >= 10 && level < 20) {
            return "Beginner developer";
        } else if (level >= 20 && level < 30) {
            return "Apprentice developer";
        } else if (level >= 30 && level < 40) {
            return "Assistant developer";
        } else if (level >= 40 && level < 50) {
            return "Basic developer";
        } else {
            return "Junior developer";
        }
    }

    async getData() {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }
            const response = await fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    query: `query userData{
                                  user {
                                  id
                                  auditRatio
                                  login
                                  email
                                  campus
                                  lastName
                                  firstName
                                  createdAt
                                  level: transactions(
                                  where: {path: {_like: "%module%"}, type: {_eq: "level"}}
                                  order_by: {createdAt: desc}
                                  limit: 1
                              ) {
                                  amount
                              }

                                  skills: transactions(
                                  distinct_on: type 
                                  where: { type: { _like: "skill_%" } }
                                  order_by: [{ type: asc }, { amount: desc }]
                                  ) {
                                  id
                                  type
                                  amount
                                  }

                                  xp_and_projects: transactions(
                                      where: {
                                          _and: [
                                          { type: { _eq: "xp" } }
                                          { path: { _like: "%module%" } }
                                          { object: { type: { _eq: "project" } } }
                                          ]
                                      }
                                      ) {
                                      type
                                      amount
                                      path
                                      createdAt
                                      eventId
                                      object {
                                          id
                                          type
                                          name
                                      }
                                      }

                              total_xp: transactions_aggregate(
                                  where: {
                                  _and: [
                                      { type: { _eq: "xp" } }
                                      { eventId: { _eq: 41 } }
                                  ]
                                  }
                              ) {
                                  aggregate {
                                  sum {
                                      amount
                                  }
                                  }
                              } 
                              }
                              }
                              `
                })
            })

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();

            const response2 = await fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    query: `query progress($rootPaths: [String!]!) {
                                progress (
                                order_by: [{createdAt: desc}]
                                where: {
                                    _and: [
                                    { path: { _in: $rootPaths} },
                                    ]
                                }
                                ) {
                                    path
                                isDone
                                }
                            }
                            `,
                    variables: {
                        "rootPaths": [
                            "/oujda/module/piscine-js",
                            "/oujda/piscine-go",
                            "/oujda/module/piscine-rust"
                        ]
                    }
                })
            })


            if (!response2.ok) {
                throw new Error(response.statusText);
            }

            const data2 = await response2.json();

            data.data["piscines"] = data2.data.progress;
            return data.data;
        } catch (error) {
            document.body.innerHTML = error;
        }
    }

}

export { Home };