import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RegisterScreen from './src/Components/RegisterScreen';
import { Auth } from 'aws-amplify'; 

jest.mock('aws-amplify'); // Mock de aws-amplify

describe('RegisterScreen', () => {
  it('handles registration correctly', async () => {
    const signUpMock = jest.fn();
    Auth.signUp.mockImplementation(signUpMock);

    // Renderiza el componente
    const { getByText, getByPlaceholderText } = render(<RegisterScreen />);

    // Simula cambios en los campos de entrada
    const nameInput = getByPlaceholderText('Nombre');
    const emailInput = getByPlaceholderText('Correo electrónico');
    const passwordInput = getByPlaceholderText('Contraseña');
    const confirmPasswordInput = getByPlaceholderText('Repetir contraseña');
    fireEvent.changeText(nameInput, 'John');
    fireEvent.changeText(emailInput, 'john@example.com');
    fireEvent.changeText(passwordInput, 'Password123');
    fireEvent.changeText(confirmPasswordInput, 'Password123');

    // Simula el clic en el botón de registro
    const registerButton = getByText('Registrarse');
    fireEvent.press(registerButton);

    // Se verifica que Auth.signUp haya sido llamado con los datos correctos
    expect(signUpMock).toHaveBeenCalledWith({
      username: 'john@example.com',
      password: 'Password123',
      attributes: {
        given_name: 'John',
        family_name: 'Apellido',
      },
    });
  });
});
