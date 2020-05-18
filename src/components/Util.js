import React from "react";

export function getRoles() {
    return new Promise((resolve) => {
        fetch("http://localhost:8080/roles/")
            .then((res) => res.json())
            .then(
                (result) => {
                    resolve(result);
                },
                (error) => {
                    console.log(error);
                }
            );
    });
}

export function getUsers() {
    return new Promise((resolve) => {
        fetch("http://localhost:8080/users/")
            .then((res) => res.json())
            .then(
                (result) => {
                    resolve(result);
                },
                (error) => {
                    console.log(error);
                }
            )
            .then((users) => {
                return users;
            });
    });
}
export function getSkillsByCategoryId(params) {
    return new Promise((resolve) => {
        fetch("http://localhost:8080/skills/" + params)
            .then((res) => res.json())
            .then(
                (result) => {
                    resolve(result);
                },
                (error) => {
                    console.log(error);
                }
            )
            .then((skills) => {
                return skills;
            });
    });
}
export function getCategories() {
    return new Promise((resolve) => {
        fetch("http://localhost:8080/categories")
            .then((res) => res.json())
            .then(
                (result) => {
                    resolve(result);
                },
                (error) => {
                    console.log(error);
                }
            )
            .then((skills) => {
                return skills;
            });
    });
}
export function getOffers(params) {
    return new Promise((resolve) => {
        fetch("http://localhost:8080/offers/" + params)
            .then((res) => res.json())
            .then(
                (result) => {
                    resolve(result);
                },
                (error) => {
                    console.log(error);
                }
            )
            .then((offers) => {
                return offers;
            });
    });
}
export function getProjectsByDate(period) {
    return new Promise((resolve) => {
        fetch("http://localhost:8080/getprojectsbydate/" + period)
            .then((res) => res.json())
            .then(
                (result) => {
                    resolve(result);
                },
                (error) => {
                    console.log(error);
                }
            );
    });
}
export function getOffersByDate(period) {
    return new Promise((resolve) => {
        fetch("http://localhost:8080/getoffersbydate/" + period)
            .then((res) => res.json())
            .then(
                (result) => {
                    resolve(result);
                },
                (error) => {
                    console.log(error);
                }
            );
    });
}
export function getMyProjects(userId) {
    return new Promise((resolve) => {
        fetch("http://localhost:8080/getmyprojects/" + userId)
            .then((res) => res.json())
            .then(
                (result) => {
                    resolve(result);
                },
                (error) => {
                    console.log(error);
                }
            );
    });
}
export function getProjectsToDo(userId) {
    return new Promise((resolve) => {
        fetch("http://localhost:8080/getprojectstodo/" + userId)
            .then((res) => res.json())
            .then(
                (result) => {
                    resolve(result);
                },
                (error) => {
                    console.log(error);
                }
            );
    });
}
export function updateProjectByChosenOffer(projectId, offerId) {
    var body = {
        project_id: projectId,
        offer_id: offerId,
    };
    const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    };
    fetch("http://localhost:8080/chooseoffer", requestOptions).then(
        (response) => {
            if (response.status == 200) {
                return true;
            }
        }
    );
}
export function setStatusToDone(projectId) {
    var body = {
        project_id: projectId,
    };
    const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    };
    fetch("http://localhost:8080/setstatustodone", requestOptions).then(
        (response) => {
            if (response.status == 200) {
                return true;
            }
        }
    );
}
export function checkIfUserAlreadyPostedOffer(userId, projectId) {
    return new Promise((resolve) => {
        fetch(
            "http://localhost:8080/checkifcanpostoffer/" +
                userId +
                "/" +
                projectId
        )
            .then((res) => res.json())
            .then(
                (result) => {
                    resolve(result);
                },
                (error) => {
                    console.log(error);
                }
            );
    });
}
export function deleteUser(userId) {
    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:8080/deleteuser/" + userId, requestOptions).then(
        (response) => {
            if (response.status == 200) {
                return true;
            }
        }
    );
}
export function deleteProject(projectId) {
    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    };
    fetch(
        "http://localhost:8080/deleteproject/" + projectId,
        requestOptions
    ).then((response) => {
        if (response.status == 200) {
            return true;
        }
    });
}
export function deleteOffer(offerId) {
    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:8080/deleteoffer/" + offerId, requestOptions).then(
        (response) => {
            if (response.status == 200) {
                return true;
            }
        }
    );
}
