const API_BASE_URL = '/api';

async function validateEmailWithBackend(email) {
  try {
    console.log('🔍 Enviando email a validar:', email);
    
    const response = await fetch(`${API_BASE_URL}/validate-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    
    console.log('📡 Respuesta del servidor:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Error en la respuesta:', errorData);
      throw new Error(`Error: ${response.status} - ${errorData.error || 'Error desconocido'}`);
    }
    
    const data = await response.json();
    console.log('✅ Datos recibidos:', data);
    return data;
  } catch (error) {
    console.error('💥 Error validando email:', error);
    throw error;
  }
}

// Función para verificar estado del endpoint
async function checkBackendStatus() {
  try {
    const response = await fetch(`${API_BASE_URL}/validate-email`, {
      method: 'GET'
    });
    const data = await response.json();
    console.log('🔧 Estado del backend:', data);
    return data;
  } catch (error) {
    console.error('⚠️ Error consultando status:', error);
  }
}

const REDIRECT_PAGE = '../lobby/lobby.html';
