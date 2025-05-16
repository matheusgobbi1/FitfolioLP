/**
 * Serviço para geração de QR Codes PIX 
 * Versão máxima compatibilidade - Usa formato estático padrão do Banco Central
 */

// Configuração padrão para o PIX do evento
const DEFAULT_MERCHANT_NAME = "MATHEUS VASCONCELOS"; 
const DEFAULT_MERCHANT_CITY = "SAO PAULO";
// Formato correto para chave PIX de telefone (sem o '+' no início)
const DEFAULT_PIX_KEY = "+5511985395297";

/**
 * Função para calcular o CRC (Cyclic Redundancy Check) conforme especificação PIX
 */
const crcCalculator = (str: string): string => {
  // Implementação do cálculo CRC16-CCITT para o PIX (polinômio 0x1021)
  const polynomial = 0x1021;
  let crc = 0xFFFF;
  
  // Passar por cada caractere da string
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    crc ^= (char << 8);
    
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = ((crc << 1) ^ polynomial) & 0xFFFF;
      } else {
        crc = (crc << 1) & 0xFFFF;
      }
    }
  }
  
  // Retornar o valor hexadecimal do CRC em maiúsculas com padding
  return crc.toString(16).toUpperCase().padStart(4, '0');
};

/**
 * Gera o campo EMV (ID + Tamanho + Valor)
 */
const getEMVField = (id: string, value: string): string => {
  // Tamanho do valor formatado com 2 dígitos
  const valueLength = value.length.toString().padStart(2, '0');
  return `${id}${valueLength}${value}`;
};

/**
 * Gera um código PIX extremamente simplificado no formato padrão do Banco Central
 * Implementação mínima seguindo https://www.bcb.gov.br/estabilidadefinanceira/pix
 */
export const generatePixCode = async (
  amount: number
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
): Promise<{ payload: string, base64: string }> => {
  try {
    // Formata o valor para o formato com dois decimais
    const formattedAmount = amount.toFixed(2);
    
    // Versão mínima - apenas elementos obrigatórios
    // 00 - Payload Format Indicator
    const payloadFormat = getEMVField('00', '01');
    
    // 01 - Point of Initiation Method - 12 para código único (não reutilizável)
    const pointOfInitiation = getEMVField('01', '12');
    
    // 26 - Merchant Account Information (PIX)
    // Corrigida a ordem e formatação conforme especificação do Banco Central
    const merchantAccount = getEMVField('26',
      getEMVField('00', 'br.gov.bcb.pix') +         // GUI obrigatório
      getEMVField('01', DEFAULT_PIX_KEY) +           // Chave Pix sem '+'
      getEMVField('02', 'FITFOLIORUN')                // Descrição (opcional)
    );
    
    // 52 - Merchant Category Code
    const merchantCategory = getEMVField('52', '0000');
    
    // 53 - Transaction Currency (986 = BRL)
    const currency = getEMVField('53', '986');
    
    // 54 - Transaction Amount
    const transactionAmount = getEMVField('54', formattedAmount);
    
    // 58 - Country Code
    const country = getEMVField('58', 'BR');
    
    // 59 - Merchant Name (máximo 25 caracteres)
    const merchant = getEMVField('59', DEFAULT_MERCHANT_NAME);
    
    // 60 - Merchant City
    const city = getEMVField('60', DEFAULT_MERCHANT_CITY);
    
    // 62 - Additional Data Field - necessário para compatibilidade
    const referenceLabel = getEMVField('05', 'INSCRICAOFITFOLIORUN');
    const additionalData = getEMVField('62', referenceLabel);
    
    // Montando o payload com todos os campos
    const payload = 
      payloadFormat +
      pointOfInitiation +
      merchantAccount +
      merchantCategory +
      currency +
      transactionAmount +
      country +
      merchant +
      city +
      additionalData;
    
    // Adicionar o campo CRC
    const payloadWithCRCTag = payload + '6304';
    const crcValue = crcCalculator(payloadWithCRCTag);
    const fullPayload = payloadWithCRCTag + crcValue;
    
    console.log('Payload PIX versão máxima compatibilidade:', fullPayload);
    
    return {
      payload: fullPayload,
      base64: ''
    };
  } catch (error) {
    console.error('Erro ao gerar código PIX:', error);
    return { payload: '', base64: '' };
  }
};

/**
 * Formata o valor para exibição em formato monetário brasileiro (R$)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount);
}; 