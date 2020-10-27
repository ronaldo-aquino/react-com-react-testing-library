import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("<App /> Testando a aplicação completa", () => {
    
    render(<App />);

    expect( screen.getByText('Administrador de Pacientes') ).toBeInTheDocument();
    expect( screen.getByTestId('nomeApp').textContent ).toBe('Administrador de Pacientes');
    expect( screen.getByTestId('nomeApp').tagName ).toBe('H1');

    // expect( screen.getByText('Crear Cita') ).toBeInTheDocument();
    // expect( screen.getByText('No hay citas') ).toBeInTheDocument();
    
});
