import React from 'react';
import { TouchableOpacity, Text, Linking, StyleSheet, Alert } from 'react-native';
import { PRIVACY_POLICY_URL } from '../constants/PrivacyPolicyUrl';

/**
 * Exemplo de como usar a URL da política de privacidade no aplicativo móvel.
 * 
 * No App Store Connect, você pode fornecer a URL diretamente:
 * URL: https://fitfolio.com.br/privacy-policy.html
 */
const PrivacyPolicyLink: React.FC = () => {
  const openPrivacyPolicy = async () => {
    // Verifica se o link pode ser aberto
    const canOpen = await Linking.canOpenURL(PRIVACY_POLICY_URL);
    
    if (canOpen) {
      // Abre a URL no navegador padrão do dispositivo
      await Linking.openURL(PRIVACY_POLICY_URL);
    } else {
      Alert.alert(
        "Erro",
        "Não foi possível abrir a política de privacidade. Por favor, visite fitfolio.com.br para mais informações."
      );
    }
  };

  return (
    <TouchableOpacity onPress={openPrivacyPolicy} style={styles.button}>
      <Text style={styles.buttonText}>Política de Privacidade</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  buttonText: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default PrivacyPolicyLink;

/**
 * Instruções para App Store Connect:
 * 
 * 1. Ao configurar seu app na App Store Connect, você será solicitado a fornecer
 *    uma URL para sua política de privacidade.
 * 
 * 2. Use a URL: https://fitfolio.com.br/privacy-policy.html
 * 
 * 3. Certifique-se de que seu site esteja no ar e que essa página seja acessível
 *    antes de enviar o aplicativo para revisão.
 * 
 * 4. A Apple exige que todas as políticas de privacidade sejam facilmente acessíveis
 *    diretamente do aplicativo. Você pode usar o componente acima para fornecer este acesso.
 */ 