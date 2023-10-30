import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProfileScreen from './ProfileScreen'; // Asegúrate de importar tu componente correctamente
import { Auth, Storage, API, graphqlOperation } from 'aws-amplify';

jest.mock('aws-amplify'); // Mock de aws-amplify

describe('ProfileScreen', () => {
  it('handles profile data and image upload correctly', async () => {
    // Mock para obtener el ID del usuario
    Auth.currentAuthenticatedUser.mockReturnValue(Promise.resolve({ username: 'user123' }));

    const createProfileMock = jest.fn();
    API.graphql.mockReturnValue(Promise.resolve({ data: { createProfile: {} } }));
    graphqlOperation.mockReturnValue({});
    API.graphql.mockImplementation(createProfileMock);
    
    const { getByText, getByPlaceholderText } = render(<ProfileScreen />);

    // Simula cambios en los campos de entrada y selecciona una imagen
    const nameInput = getByPlaceholderText('Nombre');
    const lastNameInput = getByPlaceholderText('Apellido');
    const ageInput = getByPlaceholderText('Edad');
    const genderInput = getByPlaceholderText('Sexo');
    fireEvent.changeText(nameInput, 'John');
    fireEvent.changeText(lastNameInput, 'Doe');
    fireEvent.changeText(ageInput, '25');
    fireEvent.changeText(genderInput, 'Male');

    // Simula el clic en el botón de guardar cambios
    const saveButton = getByText('Guardar Cambios');
    fireEvent.press(saveButton);

    // Verifica que Auth.currentAuthenticatedUser haya sido llamado
    expect(Auth.currentAuthenticatedUser).toHaveBeenCalled();

    // Verifica que createProfile haya sido llamado con los datos correctos
    expect(createProfileMock).toHaveBeenCalledWith(
      expect.objectContaining({
        input: expect.objectContaining({
          UserID: 'user123',
          Role: '', // Ajusta según tus necesidades
          Name: 'Diego',
          LastName: 'Gomez',
          age: 25,
          Sex: 'Male',
        }),
      })
    );
  });
});
