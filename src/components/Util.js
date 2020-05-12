import React from "react";

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
