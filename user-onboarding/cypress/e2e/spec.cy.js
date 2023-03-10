describe('template spec', () => {
  beforeEach(() => {
  cy.visit('http://localhost:3000/')
  })

  const userInput = () => cy.get(`input[name=user]`);
  const emailInput = () => cy.get("input[name=email]");
  const passwordInput = () => cy.get("input[name=password]");
  const agreeInput = () => cy.get("input[name=agree]");
  const buttonInput = () => cy.get("button[name=button]");
  const roleSelect = () => cy.get("select[name=role]")
  const checkboxinput =() => cy.get("input[name=agree]")

  it("it test works", () => {
    expect(1 + 2).to.equal(3);
    expect(2 + 2).not.equal(5);
    expect({}).not.equal({});
    expect({}).to.eql({});
  })


  it("Proper elements are showing", () => {
    
    emailInput().should("exist");
    passwordInput().should("exist");
    agreeInput().should("exist");
    buttonInput().should("exist");
    userInput().should("exist");
    checkboxinput().should("exist");
    roleSelect().should("exist");

    cy.contains(/submit/i).should("exist");
    cy.contains("Name").should("exist");
    cy.contains("Email").should("exist");
    cy.contains("Password").should("exist");
    cy.contains(/role/i).should("exist");
    cy.contains("Terms of Service").should("exist");
  })

  describe("Filling out inputs and cancelling", () => {
    it("can navigate", () => {
      cy.url().should("include", "localhost");
    })
    it("Submit button start out Disable", () => {
      buttonInput().should("have.attr", "disabled");
    })
    
    it("Find check and test", () => {
      checkboxinput().check();
    })

    it("can type input", () => {
      userInput()
      .should("have.value", "")
      .type("CSS rulez")
      .should("have.value", "CSS rulez");
    })
    
    it("can type input", () => {
      emailInput()
      .should("have.value", "")
      .type("CRHarding")
      .should("have.value", "CRHarding");
    })

    it("can type input", () => {
      passwordInput()
      .should("have.value", "")
      .type("12345678")
      .should("have.value", "12345678");
    })

    it("can select", () => {
      roleSelect().select("Others")
    })

    

    it("the submit button enables when all inputs are filled out", () => {
      userInput().type("Alejandro");
      emailInput().type("alejandro@gmail.com");
      passwordInput().type("12345678");
      checkboxinput().check();
      roleSelect().select('Others');
      buttonInput().should("not.have.attr", "disabled");
    })
  })








































})  