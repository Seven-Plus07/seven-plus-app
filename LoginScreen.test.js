import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from './src/Components/LoginScreen'; // Ajusta la ruta según corresponda

describe('<LoginScreen />', () => {
  // Test para verificar si el componente se renderiza correctamente
  it('renders correctly', () => {
    const { getByPlaceholderText } = render(<LoginScreen />);
    expect(getByPlaceholderText('Correo electrónico')).toBeTruthy();
    expect(getByPlaceholderText('Contraseña')).toBeTruthy();
  });

  // Test para la lógica de validación de email
  it('displays error message for invalid email', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    const emailInput = getByPlaceholderText('Correo electrónico');
    fireEvent.changeText(emailInput, 'invalidEmail');

    // Simular toque en el botón de inicio de sesión
    const loginButton = getByText('Iniciar sesión');
    fireEvent.press(loginButton);

    expect(getByText('Correo electrónico no válido')).toBeTruthy();
  });

  // NOTA: La función `authenticateUser` no fue proporcionada en tu código,
  // por lo que este ejemplo asume que siempre retorna `false`.
  it('displays error message for incorrect credentials', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    const emailInput = getByPlaceholderText('Correo electrónico');
    const passwordInput = getByPlaceholderText('Contraseña');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'wrongPassword');

    // Simular toque en el botón de inicio de sesión
    const loginButton = getByText('Iniciar sesión');
    fireEvent.press(loginButton);

    expect(getByText('Correo electrónico o contraseña incorrectos')).toBeTruthy();
  });
});
