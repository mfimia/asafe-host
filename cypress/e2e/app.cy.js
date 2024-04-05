describe('Navigation', () => {
  before(() => {
    cy.log(`Visiting ${Cypress.env("baseUrl")}`)
    cy.visit(`${Cypress.env("baseUrl")}`)
  })

  it('should redirect to sign in page when unauthorized user clicks on dashboard', () => {
    cy.get('nav a[href*="dashboard"]').click()

    cy.url().should('include', '/api/auth/signin?callbackUrl=%2Fdashboard')

    cy.get('button[type="submit"] span').contains('Sign in with GitHub')
  })

  it("should successfully see the dashboard when first logged in", () => {
    cy.login();
    cy.visit(`${Cypress.env("baseUrl")}/dashboard`);
    cy.wait("@session");

    cy.get("[data-test-id='authenticated']").should("exist").then(() => {
      cy.log("Cypress login successful");
    });
  });
})