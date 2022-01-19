import React from 'react';


//TEST 1 - HOME RENDER
describe("renders home", () => {
    it("renders correctly", () => {
        cy.visit('/');
    })
})

//TEST 2 - SUBMIT FORM
describe("submit header form", () => {
    it("submit correctly", () => {
        cy.get('form').submit()
    })
})
//TEST 3 - DISPLAYING ALL PROJECTS
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
//TEST 4 - PROJECTS CORRESPONDIG TO USER
describe("displays project regarding user", () => {
    it("corresponding project", () => {
        cy.get('span').filter('#first_user')
        cy.get('span').filter('#second_user')
    });
});




