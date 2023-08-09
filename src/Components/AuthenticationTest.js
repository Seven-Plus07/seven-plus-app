// Función ficticia de autenticación
export
const authenticateUser = (email, password) => {
    const validEmail = 'sevenplus@gmail.com';
    const validPassword = 'password123';

    if (email === validEmail && password === validPassword) {
      return true; // Credenciales válidas
    } else {
      return false; // Credenciales inválidas
    }

};
