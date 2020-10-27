import React from "react";
import { render, screen } from "@testing-library/react";
import Formulario from "../components/Formulario";
import "@testing-library/jest-dom/extend-expect";

test("<Formulario / > Carregar o formulário e revisar se está renderizando corretamente", () => {
    // const wrapper = render(<Formulario />);
    // wrapper.debug();

    render(<Formulario />);
    expect(screen.getByText("Crear Cita")).toBeInTheDocument();

    // Header
    const titulo  = screen.getByTestId("titulo")
    expect(titulo.tagName).toBe("H2");
    expect(titulo.tagName).not.toBe("H1");
    expect(titulo.textContent).toBe("Crear Cita");

    // Botão de submit
    const btnSubmit = screen.getByTestId("btn-submit");
    expect(btnSubmit.tagName).toBe("BUTTON");
    expect(btnSubmit.textContent).toBe("Agregar Cita");
    expect(btnSubmit.textContent).not.toBe("Agregar Nueva Cita");

});
