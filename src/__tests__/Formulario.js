import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Formulario from "../components/Formulario";
import "@testing-library/jest-dom/extend-expect";

const crearCita = jest.fn();

test("<Formulario / > Carregar o formulário e revisar se está renderizando corretamente", () => {
    // const wrapper = render(<Formulario />);
    // wrapper.debug();

    render(<Formulario crearCita={crearCita} />);
    expect(screen.getByText("Crear Cita")).toBeInTheDocument();

    // Header
    const titulo = screen.getByTestId("titulo");
    expect(titulo.tagName).toBe("H2");
    expect(titulo.tagName).not.toBe("H1");
    expect(titulo.textContent).toBe("Crear Cita");

    // Botão de submit
    const btnSubmit = screen.getByTestId("btn-submit");
    expect(btnSubmit.tagName).toBe("BUTTON");
    expect(btnSubmit.textContent).toBe("Agregar Cita");
    expect(btnSubmit.textContent).not.toBe("Agregar Nueva Cita");
});

test("<Formulario /> Validação do formulário", () => {
    render(<Formulario crearCita={crearCita} />);

    // Clique no botão de submit
    const btnSubmit = screen.getByTestId("btn-submit");
    fireEvent.click(btnSubmit);

    // Revisar a validação
    expect(screen.getByTestId("alerta")).toBeInTheDocument();
    expect(screen.getByTestId("alerta").textContent).toBe(
        "Todos los campos son obligatorios"
    );
    expect(screen.getByTestId("alerta").tagName).toBe("P");
    expect(screen.getByTestId("alerta").tagName).not.toBe("BUTTON");
});
