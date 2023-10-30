import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '.src/Components/LoginScreen';
import { Auth } from 'aws-amplify';

jest.mock('aws-amplify'); // Mock de aws-amplify

describe('LoginScreen', () => {
  it('handles login correctly', async () => {
    const signInMock = jest.fn();
    Auth.signIn.mockImplementation(signInMock);

    const { getByText, getByPlaceholderText } = render(<LoginScreen />);

    // Esta parte simula cambios en los campos de entrada
    const emailInput = getByPlaceholderText('Correo electrónico');
    const passwordInput = getByPlaceholderText('Contraseña');
    fireEvent.changeText(emailInput, 'joby@example.com');
    fireEvent.changeText(passwordInput, 'Password123');

    // Simula el clic en el botón de inicio de sesión
    const loginButton = getByText('Iniciar sesión');
    fireEvent.press(loginButton);

    // Verifica que Auth.signIn haya sido llamado con los datos correctos
    expect(signInMock).toHaveBeenCalledWith('joby@example.com', 'Password123');
  });
});
