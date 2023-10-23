import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from './src/Components/LoginScreen'; 

describe('<LoginScreen />', () => {
  test('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    // Verifica que los elementos estén presentes en la pantalla
    expect(getByPlaceholderText('Correo electrónico')).toBeTruthy();
    expect(getByPlaceholderText('Contraseña')).toBeTruthy();
    expect(getByText('Iniciar sesión')).toBeTruthy();
    expect(getByText('Registrarse')).toBeTruthy();
    expect(getByText('¿Olvidaste tu contraseña?')).toBeTruthy();
  });

  test('handles user input and button press', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    
    // Simula la entrada de usuario
    fireEvent.changeText(getByPlaceholderText('Correo electrónico'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Contraseña'), 'password123');

    // Verifica que los valores de entrada sean correctos
    expect(getByPlaceholderText('Correo electrónico').props.value).toBe('test@example.com');
    expect(getByPlaceholderText('Contraseña').props.value).toBe('password123');

    // Simula el click en el botón de inicio de sesión
    fireEvent.press(getByText('Iniciar sesión'));

    // Puedes realizar más verificaciones aquí, por ejemplo, verificar el comportamiento después del inicio de sesión
  });
});
