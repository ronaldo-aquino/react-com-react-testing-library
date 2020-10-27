import React from "react";
import { render, screen } from "@testing-library/react";
import Formulario from "../components/Formulario";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

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
    userEvent.click(btnSubmit);

    // Revisar a validação (Tem que aparecer um alerta)
    const alerta = screen.getByTestId("alerta");
    expect(alerta).toBeInTheDocument();
    expect(alerta.textContent).toBe("Todos los campos son obligatorios");
    expect(alerta.tagName).toBe("P");
    expect(alerta.tagName).not.toBe("BUTTON");
});

test("<Formulario /> Validação do formulário", () => {
    render(<Formulario crearCita={crearCita} />);

    userEvent.type(screen.getByTestId("mascota"), "Hook");
    userEvent.type(screen.getByTestId("propietario"), "Ronaldo");
    userEvent.type(screen.getByTestId("fecha"), "2021-09-10");
    userEvent.type(screen.getByTestId("hora"), "10:30");
    userEvent.type(screen.getByTestId("sintomas"), "Só fica dormindo");

    // Clique no botão de submit
    const btnSubmit = screen.getByTestId("btn-submit");
    userEvent.click(btnSubmit);

     // Revisar a validação ( O alerta tem que dasaparecer)
     const alerta = screen.queryByTestId("alerta");
     expect(alerta).not.toBeInTheDocument();

    // Criar cita e validar que foi enviada e verifica se a função foi chamada
    expect(crearCita).toHaveBeenCalled();
    expect(crearCita).toHaveBeenCalledTimes(1);

});
