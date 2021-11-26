import React from 'react';

describe("renders home", () => {
    it("renders correctly", () => {
        cy.visit('http:localhost:3000');
    })
})

describe("submit header form", () => {
    it("submit correctly", () => {
        cy.get('form').submit()
    })
})

describe("displays all projects despite connexion", () => {
    it("displays correctly", () => {
        cy.get('li').filter('#projectList')
            .should('have.length', 4)
            .each(($li, index, $lis) => {
                return 'all project displays'
            })
            .then(($lis) => {
                expect($lis).to.have.length(4)
            })
    });
})

describe("displays project regarding user", () => {
    it("corresponding project", () => {
        cy.get('span').filter('#first_user')
        cy.get('span').filter('#second_user')


    });
});




