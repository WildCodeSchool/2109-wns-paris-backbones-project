import React from 'react';
import { ProjectList } from '../../src/components/ProjectList/ProjectList'

describe("renders home", () => {
    it("renders correctly", () => {
        cy.visit('http:localhost:3000ss');
    })
})

describe("submit header form", () => {
    it("submit correctly", () => {
        cy.get('form').submit()
    })
})

describe("displays all projects despite connection", () => {
    it("displays correctly", () => {
        cy.get('#projectList').should('have.length', 4)
    });
});






