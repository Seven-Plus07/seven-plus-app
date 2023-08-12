import { Font } from 'expo-font';
import { FontAwesome5 } from '@expo/vector-icons';

// Define las fuentes que deseas cargar
const customFonts = {
  'FontAwesome5Free-Solid': FontAwesome5.font,
};

// Carga las fuentes con Font.loadAsync
async function loadFonts() {
  await Font.loadAsync(customFonts);
}

// Llama a loadFonts al inicio de la aplicación
loadFonts();
