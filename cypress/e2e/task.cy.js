describe("Task Management", () => {
  let users;

  before(() => {
    cy.fixture("user").then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    cy.login(users.admin.email, users.admin.password);
  });

  describe("Create Task", () => {
    it("should navigate to create task page", () => {
      cy.contains("Create New Task").click();

      cy.url().should("include", "/tasks/new");
      cy.contains("Fill in the details below to create a new task")
        .should("be.visible");
    });

    it("should create a new task successfully", () => {
      const title = `Cypress Task ${new Date()}`;

      cy.contains("Create New Task").click();

      cy.get("#title").type(title);
      cy.get("#description").type("Created by Cypress");
      cy.get("#status").select("in_progress");
      cy.get("#priority").select("high");

      cy.contains("Create Task").click();

      cy.url().should("include", "/tasks");
      cy.contains(title).should("be.visible");
    });
  });

  describe("Edit Task", () => {
    it("should update task successfully", () => {
      const updatedTitle = `Updated Task ${new Date()}`;

      cy.get(".cursor-pointer").first().click();

      cy.contains("Edit Task").click();

      cy.url().should("include", "/edit");

      cy.get("#title").clear().type(updatedTitle);
      cy.get("#description").clear().type("Updated by Cypress");
      cy.get("#status").select("Completed");
      cy.get("#priority").select("Medium");

      cy.contains("Update Task").click();

      cy.contains("Back to Tasks").click();

      cy.url().should("include", "/tasks");
      cy.contains(updatedTitle).should("be.visible");
    });
  });

  describe("Delete Task", () => {
    it("should delete task successfully", () => {
      cy.get(".cursor-pointer")
        .first()
        .invoke("text")
        .then((taskTitle) => {

          cy.get(".cursor-pointer").first().click();

          cy.contains("Delete Task").click();

          cy.on("window:confirm", () => true);

          cy.url().should("include", "/tasks");
          cy.contains(taskTitle.trim()).should("not.exist");
        });
    });
  });

  describe("Filter Tasks", () => {
    it("should filter tasks by completed status", () => {
      cy.get("#status-filter").select("completed");

      cy.get("#status-filter").should("have.value", "completed");
    });
  });
});