import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("<App /> Testando a aplicação completa", () => {
    render(<App />);

    expect(screen.getByText("Administrador de Pacientes")).toBeInTheDocument();
    expect(screen.getByTestId("nomeApp").textContent).toBe(
        "Administrador de Pacientes"
    );
    expect(screen.getByTestId("nomeApp").tagName).toBe("H1");

    expect(screen.getByText("Crear Cita")).toBeInTheDocument();
    expect(screen.getByText("No hay citas")).toBeInTheDocument();
});

test("<App /> Adicionar cita e virificar heading", () => {
    render(<App />);

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

    // Validar se tem um título dinâmico
    expect(screen.getByTestId("titulo-dinamico").textContent).toBe(
        "Administra tus Citas"
    );
    expect(screen.getByTestId("titulo-dinamico").textContent).not.toBe(
        "No hay citas"
    );
});

test("<App /> Virificar citas no DOM", async () => {
    render(<App />);

    const citas = await screen.findAllByTestId('cita');

    // Snapshot para criar um arquivo para verificar o conteúdo
    // expect(citas).toMatchSnapshot()

    expect(screen.getByTestId('btn-eliminar').tagName).toBe('BUTTON');
    expect(screen.getByTestId('btn-eliminar')).toBeInTheDocument();

    // Verificar alguma cita
    expect(screen.getByText('Hook')).toBeInTheDocument();

});


test("<App /> Excluit cita", () => {
    render(<App />);

    const btnEliminar =  screen.getByTestId('btn-eliminar');
    expect(btnEliminar.tagName).toBe('BUTTON');
    expect(btnEliminar).toBeInTheDocument();

    // Simular click
    userEvent.click(btnEliminar);

    // Botão deve sumir do DOM
    expect(btnEliminar).not.toBeInTheDocument();

    expect(screen.queryByText('Hook')).not.toBeInTheDocument();
    expect(screen.queryByTestId('cita')).not.toBeInTheDocument();
});