describe("renders home", () => {
    it("renders correctly", () => {
        cy.visit('/');
    })
})

describe("submit header form", () => {
    it("submit correctly", () => {
        cy.get('form').submit()
    })
})




