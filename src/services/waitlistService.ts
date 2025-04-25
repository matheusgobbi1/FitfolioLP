import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

// Nome da coleção no Firestore
const WAITLIST_COLLECTION = 'waitlist';

/**
 * Adiciona um email à lista de espera
 * @param email Email do usuário
 * @returns Promise com o resultado da operação
 */
export const addToWaitlist = async (email: string): Promise<{ success: boolean; message: string }> => {
  if (!email || !email.trim()) {
    return {
      success: false,
      message: 'Por favor, forneça um email válido.'
    };
  }

  try {
    // Verificar se o email já existe na lista
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      return {
        success: false,
        message: 'Este email já está na lista de espera.'
      };
    }

    // Adicionar o email à coleção
    await addDoc(collection(db, WAITLIST_COLLECTION), {
      email,
      createdAt: new Date().toISOString(),
      source: 'website'
    });

    return {
      success: true,
      message: 'Obrigado por se juntar! Manteremos você atualizado.'
    };
  } catch (error) {
    console.error('Erro ao adicionar email à lista de espera:', error);
    
    // Mensagem de erro mais específica se possível
    let errorMessage = 'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.';
    
    if (error instanceof Error) {
      // Registrar o erro específico para depuração
      console.error('Detalhes do erro:', error.message);
      
      // Verificar se é um erro de permissão do Firestore
      if (error.message.includes('permission-denied')) {
        errorMessage = 'Sem permissão para adicionar à lista de espera. Por favor, contate o suporte.';
      }
    }
    
    return {
      success: false,
      message: errorMessage
    };
  }
};

/**
 * Verifica se um email já existe na lista de espera
 * @param email Email para verificar
 * @returns Promise<boolean> indicando se o email existe
 */
const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const q = query(
      collection(db, WAITLIST_COLLECTION),
      where('email', '==', email)
    );

    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Erro ao verificar se o email existe:', error);
    // Em caso de erro na verificação, assumimos que o email não existe
    // para evitar bloquear o usuário, mas registramos o erro
    return false;
  }
}; 