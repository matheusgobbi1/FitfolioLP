import { collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

// Nome da coleção no Firestore
const EVENT_REGISTRATION_COLLECTION = 'eventRegistrations';

// Tipos para o serviço
export interface EventRegistrationData {
  name: string;
  email: string;
  phone: string;
  gender: string;
  shirtSize: string;
  paymentStatus: 'pending' | 'completed';
  registrationDate: string;
  registrationId?: string;
}

/**
 * Registra um participante para o evento FITFOLIO RUN
 * @param registrationData Dados do registro (nome, email, telefone, gênero, tamanho da camiseta)
 * @returns Promise com o resultado da operação e o ID do registro
 */
export const registerForEvent = async (
  registrationData: Omit<EventRegistrationData, 'paymentStatus' | 'registrationDate' | 'registrationId'>
): Promise<{ success: boolean; message: string; registrationId?: string }> => {
  if (!registrationData.email || !registrationData.email.trim()) {
    return {
      success: false,
      message: 'Por favor, forneça um email válido.'
    };
  }

  try {
    // Verificar se o email já existe na lista
    const emailExists = await checkEmailExists(registrationData.email);
    if (emailExists) {
      return {
        success: false,
        message: 'Este email já está registrado para o evento.'
      };
    }

    // Preparar os dados para salvar
    const dataToSave: EventRegistrationData = {
      ...registrationData,
      paymentStatus: 'pending',
      registrationDate: new Date().toISOString(),
    };

    // Adicionar o registro à coleção
    const docRef = await addDoc(collection(db, EVENT_REGISTRATION_COLLECTION), dataToSave);

    return {
      success: true,
      message: 'Registro realizado com sucesso! Prossiga para o pagamento.',
      registrationId: docRef.id
    };
  } catch (error) {
    console.error('Erro ao registrar para o evento:', error);
    
    // Mensagem de erro mais específica se possível
    let errorMessage = 'Ocorreu um erro ao processar seu registro. Por favor, tente novamente.';
    
    if (error instanceof Error) {
      console.error('Detalhes do erro:', error.message);
      
      if (error.message.includes('permission-denied')) {
        errorMessage = 'Sem permissão para registrar no evento. Por favor, contate o suporte.';
      }
    }
    
    return {
      success: false,
      message: errorMessage
    };
  }
};

/**
 * Atualiza o status de pagamento de um registro
 * @param registrationId ID do registro
 * @param status Novo status de pagamento ('pending' ou 'completed')
 * @returns Promise com o resultado da operação
 */
export const updatePaymentStatus = async (
  registrationId: string,
  status: 'pending' | 'completed'
): Promise<{ success: boolean; message: string }> => {
  try {
    const registrationRef = doc(db, EVENT_REGISTRATION_COLLECTION, registrationId);
    await updateDoc(registrationRef, {
      paymentStatus: status
    });
    
    return {
      success: true,
      message: status === 'completed' 
        ? 'Pagamento confirmado com sucesso!' 
        : 'Status de pagamento atualizado.'
    };
  } catch (error) {
    console.error('Erro ao atualizar status de pagamento:', error);
    return {
      success: false,
      message: 'Não foi possível atualizar o status de pagamento.'
    };
  }
};

/**
 * Verifica se um email já está registrado para o evento
 * @param email Email para verificar
 * @returns Promise<boolean> indicando se o email existe
 */
const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const q = query(
      collection(db, EVENT_REGISTRATION_COLLECTION),
      where('email', '==', email)
    );

    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Erro ao verificar se o email existe:', error);
    // Em caso de erro na verificação, assumimos que o email não existe
    return false;
  }
};

/**
 * Busca todos os participantes confirmados do evento
 * @returns Promise com lista de participantes que fizeram pagamento
 */
export const getConfirmedParticipants = async (): Promise<EventRegistrationData[]> => {
  try {
    const q = query(
      collection(db, EVENT_REGISTRATION_COLLECTION),
      where('paymentStatus', '==', 'completed')
    );

    const querySnapshot = await getDocs(q);
    const participants: EventRegistrationData[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data() as EventRegistrationData;
      participants.push({
        ...data,
        registrationId: doc.id
      });
    });
    
    // Ordenar por nome para melhor visualização
    return participants.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Erro ao buscar participantes confirmados:', error);
    return [];
  }
};

/**
 * Busca os participantes recentes (independente do status de pagamento)
 * @param limit Número máximo de participantes a retornar
 * @returns Promise com lista dos participantes mais recentes
 */
export const getRecentParticipants = async (limit = 20): Promise<EventRegistrationData[]> => {
  try {
    const q = query(
      collection(db, EVENT_REGISTRATION_COLLECTION)
    );

    const querySnapshot = await getDocs(q);
    const participants: EventRegistrationData[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data() as EventRegistrationData;
      participants.push({
        ...data,
        registrationId: doc.id
      });
    });
    
    // Ordenar por data de registro (mais recentes primeiro)
    return participants
      .sort((a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime())
      .slice(0, limit);
  } catch (error) {
    console.error('Erro ao buscar participantes recentes:', error);
    return [];
  }
}; 