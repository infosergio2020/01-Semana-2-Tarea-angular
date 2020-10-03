describe('ventana principal', () => {
    it('Puede llenar el formulario', () => {
        cy.visit('http://localhost:4200/home');
        cy.get('form');
        cy.get('input[name="nombre"]').type("Esperando la carroza").should("have.value", "Esperando la carroza");
        cy.get('input[name="imagenUrl"]').type("UnaURLCualquiera").should("have.value", "UnaURLCualquiera");
        cy.get('input[name="descripciones"]').type("mydescription").should("have.value", "mydescription");

        cy.get('input[type="submit"]').click();
        cy.get("form").submit();
    });
});