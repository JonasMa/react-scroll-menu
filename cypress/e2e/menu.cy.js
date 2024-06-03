/// <reference types="cypress" />

describe("Menu", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should scroll correct elements into view", () => {
    cy.get("ul li").last().click();
    cy.get("#three").first().should("be.visible");

    cy.get("ul li").first().click();
    cy.get("#one").should(($e) => {
      expect($e[0].getClientRects()[0].top).to.be.within(0, 1);
    });

    cy.get("ul li").eq(1).click();
    cy.get("#two").should(($e) => {
      expect($e[0].getClientRects()[0].top).to.be.within(0, 1);
    });
  });

  it("should update selected menu item ", () => {
    cy.get("#three").scrollIntoView();
    cy.get("ul li").last().should('have.class', 'active');

    cy.get("#one").scrollIntoView();
    cy.get("ul li").first().should('have.class', 'active');

    cy.get("#two").scrollIntoView();
    cy.get("ul li").eq(1).should('have.class', 'active');
  });
});
