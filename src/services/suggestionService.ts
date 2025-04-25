import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

// Nome da coleção no Firestore
const SUGGESTIONS_COLLECTION = 'suggestions';

/**
 * Adiciona uma sugestão ao Firestore
 * @param email Email do usuário
 * @param suggestion Texto da sugestão
 * @returns Promise com o resultado da operação
 */
export const addSuggestion = async (
  email: string, 
  suggestion: string
): Promise<{ success: boolean; message: string }> => {
  if (!email || !email.trim()) {
    return {
      success: false,
      message: 'Por favor, forneça um email válido.'
    };
  }

  if (!suggestion || !suggestion.trim()) {
    return {
      success: false,
      message: 'Por favor, forneça uma sugestão.'
    };
  }

  try {
    // Adicionar a sugestão à coleção
    await addDoc(collection(db, SUGGESTIONS_COLLECTION), {
      email,
      suggestion,
      createdAt: new Date().toISOString(),
      source: 'website'
    });

    return {
      success: true,
      message: 'Obrigado pela sua sugestão! Valorizamos muito sua contribuição.'
    };
  } catch (error) {
    console.error('Erro ao adicionar sugestão:', error);
    
    // Mensagem de erro mais específica se possível
    let errorMessage = 'Ocorreu um erro ao processar sua sugestão. Por favor, tente novamente.';
    
    if (error instanceof Error) {
      // Registrar o erro específico para depuração
      console.error('Detalhes do erro:', error.message);
      
      // Verificar se é um erro de permissão do Firestore
      if (error.message.includes('permission-denied')) {
        errorMessage = 'Sem permissão para adicionar sugestão. Por favor, contate o suporte.';
      }
    }
    
    return {
      success: false,
      message: errorMessage
    };
  }
}; 