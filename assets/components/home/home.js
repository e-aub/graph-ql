import { Sidebar } from "/assets/components/home/sidebar.js";
class Home {
    constructor() {
        document.querySelector("link[rel='stylesheet']").href = "/assets/styles/home.css";
        this.userData = this.getData();
        new Sidebar();
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

                              total_id: transactions_aggregate(
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

            const data2 = await response2.json();

            data.data["piscines"] = data2.data.progress;

            return data.data;
        } catch (error) {

        }
    }

}

export { Home };