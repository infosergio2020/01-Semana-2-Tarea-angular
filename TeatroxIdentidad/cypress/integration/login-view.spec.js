describe('ventana principal', () => {
    it('Puede llenar el formulario', () => {
        cy.visit('http://localhost:4200/login');
        cy.get('form');
        cy.get('input[name="nombreUsuario"]').type("sergio").should("have.value", "sergio");
        cy.get('input[name="contraseña"]').type("admin123").should("have.value", "admin123");

        cy.get("form").submit();
    });
});