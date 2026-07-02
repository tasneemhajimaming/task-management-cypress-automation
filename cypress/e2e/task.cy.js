describe("Task Management", () => {
  beforeEach(() => {
    cy.login();
  });

  describe("Create Task", () => {
    it("should navigate to Create Task page when clicking Create New Task", () => {
      cy.get('a[href="/tasks/new"]').click();

      cy.url().should("include", "/tasks/new");

      cy.contains("Fill in the details below to create a new task").should(
        "be.visible",
      );
    });

    it("should create new task successfully", () => {
      cy.visit("/tasks/new");

      const title = `Cypress Task ${Date.now()}`;

      cy.get("#title").type(title);

      cy.get("#description").type("Created by Cypress");

      cy.get("#status").select("in_progress");

      cy.get("#priority").select("high");

      cy.contains("Create Task").click();

      cy.contains(title).should("be.visible");
    });
  });

  describe("Edit Task", () => {
    it("Edit task successfully", () => {
      cy.get(".cursor-pointer").first().click();

      cy.contains("Edit Task").click();

      cy.url().should("include", "/edit");

      const updatedTitle = `Updated-${new Date()}`;

      cy.get("#title").clear().type(updatedTitle);

      cy.get("#description").clear().type("Updated Description");

      cy.get("#status").select("Completed");

      cy.get("#priority").select("Medium");

      cy.contains("Update Task").click();

      cy.contains("Back to Tasks").click();

      // cy.contains('Updated by Cypress').should('be.visible');
    });
  });

  describe("Delete Task", () => {
    it("Delete task successfully", () => {
      cy.get(".cursor-pointer").first().click();

      cy.contains("Delete Task").should("be.visible");

      cy.contains("Delete Task").click();

      cy.on("window:confirm", () => true);

      cy.url().should("include", "/tasks");
    });
  });
  
  describe("Filter and Sort", () => {
    it("should clear selected filters", () => {
      cy.get("#status-filter").select("completed");

      cy.get("#status-filter").should("have.value", "completed");
    });
  });
});
