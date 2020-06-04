import React from "react";

export function getRoles() {
    return new Promise((resolve) => {
        fetch(window.config.host + "roles/")
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
        fetch(window.config.host + "users/")
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
        fetch(window.config.host + "skills/" + params)
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
        fetch(window.config.host + "categories")
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
        fetch(window.config.host + "offers/" + params)
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
        fetch(window.config.host + "getprojectsbydate/" + period)
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
        fetch(window.config.host + "getoffersbydate/" + period)
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
export function getReportByDate(period) {
    return new Promise((resolve) => {
        fetch(window.config.host + "getreportbydate/" + period)
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
        fetch(window.config.host + "getmyprojects/" + userId)
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
        fetch(window.config.host + "getprojectstodo/" + userId)
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
    fetch(window.config.host + "chooseoffer", requestOptions).then(
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
    fetch(window.config.host + "setstatustodone", requestOptions).then(
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
            window.config.host +
                "checkifcanpostoffer/" +
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
    fetch(window.config.host + "deleteuser/" + userId, requestOptions).then(
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
        window.config.host + "deleteproject/" + projectId,
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
    fetch(window.config.host + "deleteoffer/" + offerId, requestOptions).then(
        (response) => {
            if (response.status == 200) {
                return true;
            }
        }
    );
}
