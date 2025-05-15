import React from "react";
import { colors, typography, spacing } from "../styles/appStyles";
import { X as CloseIcon } from "lucide-react";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const currentDate = new Date().toLocaleDateString("pt-BR");

  if (!isOpen) return null;

  const modalOverlayStyle = {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    overflowY: "auto" as const,
    zIndex: 1000,
    padding: "20px",
  };

  const modalContentStyle = {
    backgroundColor: colors.light,
    borderRadius: "8px",
    width: "100%",
    maxWidth: "800px",
    maxHeight: "90vh",
    overflowY: "auto" as const,
    position: "relative" as const,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
    padding: "0",
    marginTop: "20px",
  };

  const modalHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${spacing.md} ${spacing.lg}`,
    borderBottom: `1px solid ${colors.grayLight}`,
    position: "sticky" as const,
    top: 0,
    backgroundColor: colors.light,
    zIndex: 10,
  };

  const modalTitleStyle = {
    margin: 0,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.dark,
  };

  const closeButtonStyle = {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    transition: "background-color 0.2s",
    ":hover": {
      backgroundColor: `${colors.grayLight}50`,
    },
  };

  const contentStyle = {
    padding: `${spacing.lg} ${spacing.xl}`,
  };

  const lastUpdatedStyle = {
    fontSize: typography.fontSizes.sm,
    color: colors.gray,
    marginBottom: spacing.lg,
    fontStyle: "italic",
  };

  const paragraphStyle = {
    fontSize: typography.fontSizes.base,
    lineHeight: 1.6,
    color: colors.dark,
    marginBottom: spacing.md,
  };

  const sectionTitleStyle = {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.dark,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  };

  const bulletPointStyle = {
    fontSize: typography.fontSizes.base,
    lineHeight: 1.6,
    color: colors.dark,
    marginBottom: spacing.sm,
    paddingLeft: spacing.lg,
  };

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={modalOverlayStyle} onClick={handleClose}>
      <div style={modalContentStyle}>
        <div style={modalHeaderStyle}>
          <h2 style={modalTitleStyle}>Política de Privacidade</h2>
          <button
            style={closeButtonStyle}
            onClick={onClose}
            aria-label="Fechar"
          >
            <CloseIcon size={24} color={colors.dark} />
          </button>
        </div>

        <div style={contentStyle}>
          <p style={lastUpdatedStyle}>Última atualização: {currentDate}</p>

          <p style={paragraphStyle}>
            O FitFolio ("nós", "nos", ou "nosso") está comprometido em proteger sua privacidade. Esta Política de Privacidade explica como suas informações pessoais são coletadas, usadas e divulgadas pelo FitFolio.
          </p>
          <p style={paragraphStyle}>
            Esta Política de Privacidade se aplica às informações que coletamos quando você usa nosso aplicativo móvel FitFolio (coletivamente, os "Serviços").
          </p>
          <p style={paragraphStyle}>
            Ao acessar ou usar nossos Serviços, você indica que leu, entendeu e concorda com nossa coleta, armazenamento, uso e divulgação de suas informações pessoais conforme descrito nesta Política de Privacidade e em nossos Termos de Uso.
          </p>

          <h3 style={sectionTitleStyle}>1. Informações que Coletamos</h3>
          <p style={paragraphStyle}>
            Podemos coletar e processar os seguintes tipos de informações pessoais sobre você:
          </p>
          <p style={bulletPointStyle}>
            • <strong>Informações que Você Nos Fornece:</strong> Coletamos informações que você fornece diretamente a nós, como quando cria uma conta, preenche um formulário, envia uma solicitação de suporte ao cliente ou se comunica conosco de outra forma. Os tipos de informações que podemos coletar incluem seu nome, endereço de e-mail, informações de perfil (como idade, altura, peso, gênero), objetivos de condicionamento físico e qualquer outra informação que você optar por fornecer.
          </p>
          <p style={bulletPointStyle}>
            • <strong>Informações que Coletamos Automaticamente Quando Você Usa os Serviços:</strong> Coletamos informações sobre como você usa nossos Serviços, incluindo os tipos de conteúdo que você visualiza ou com os quais interage, os recursos que você usa, as ações que você realiza e o tempo, frequência e duração de suas atividades. Isso inclui informações sobre os treinos que você registra, refeições, progresso físico e outras métricas relacionadas à saúde e condicionamento físico.
          </p>
          <p style={bulletPointStyle}>
            • <strong>Informações do Dispositivo:</strong> Coletamos informações sobre o dispositivo que você usa para acessar nossos Serviços, incluindo o modelo de hardware, sistema operacional e versão, identificadores exclusivos de dispositivo, informações de rede e endereço IP.
          </p>
          <p style={bulletPointStyle}>
            • <strong>Informações de Localização:</strong> Com sua permissão, podemos coletar e processar informações sobre sua localização precisa ou aproximada. Usamos várias tecnologias para determinar a localização, incluindo endereço IP, GPS e outros sensores.
          </p>
          <p style={bulletPointStyle}>
            • <strong>Informações de Terceiros:</strong> Podemos receber informações sobre você de serviços de terceiros, como plataformas de mídia social, se você optar por fazer login ou conectar sua conta, ou de plataformas de saúde e condicionamento físico como Apple HealthKit ou Google Fit, se você nos conceder permissão para acessar esses dados. Essas informações serão tratadas de acordo com esta Política de Privacidade.
          </p>

          <h3 style={sectionTitleStyle}>2. Como Usamos Suas Informações</h3>
          <p style={paragraphStyle}>
            Usamos as informações que coletamos para:
          </p>
          <p style={bulletPointStyle}>
            • Fornecer, manter e melhorar nossos Serviços;
          </p>
          <p style={bulletPointStyle}>
            • Processar e concluir transações e enviar informações relacionadas, incluindo confirmações de compra e faturas;
          </p>
          <p style={bulletPointStyle}>
            • Enviar avisos técnicos, atualizações, alertas de segurança e mensagens de suporte e administrativas;
          </p>
          <p style={bulletPointStyle}>
            • Responder a seus comentários, perguntas e solicitações, e fornecer atendimento ao cliente;
          </p>
          <p style={bulletPointStyle}>
            • Comunicar-se com você sobre produtos, serviços, ofertas, promoções, recompensas e eventos oferecidos por nós e outros, e fornecer notícias e informações que achamos que serão de seu interesse;
          </p>
          <p style={bulletPointStyle}>
            • Monitorar e analisar tendências, uso e atividades em conexão com nossos Serviços;
          </p>
          <p style={bulletPointStyle}>
            • Personalizar e melhorar os Serviços e fornecer conteúdo, recursos e/ou anúncios adaptados aos seus interesses e preferências;
          </p>
          <p style={bulletPointStyle}>
            • Processar e entregar inscrições em concursos e recompensas;
          </p>
          <p style={bulletPointStyle}>
            • Detectar, investigar e prevenir transações fraudulentas e outras atividades ilegais e proteger os direitos e a propriedade do FitFolio e de outros.
          </p>

          <h3 style={sectionTitleStyle}>3. Como Compartilhamos Suas Informações</h3>
          <p style={paragraphStyle}>
            Podemos compartilhar as informações pessoais que coletamos da seguinte forma:
          </p>
          <p style={bulletPointStyle}>
            • <strong>Com Fornecedores, Consultores e Outros Provedores de Serviços:</strong> Podemos compartilhar suas informações com fornecedores, consultores e outros provedores de serviços que precisam acessar essas informações para realizar trabalhos em nosso nome. Esses provedores de serviços estão autorizados a usar suas informações pessoais apenas conforme necessário para nos fornecer esses serviços e são obrigados a proteger suas informações.
          </p>
          <p style={bulletPointStyle}>
            • <strong>Em Resposta a um Processo Legal:</strong> Podemos divulgar suas informações se acreditarmos que a divulgação está de acordo com, ou é exigida por, qualquer lei, regulamento ou processo legal aplicável.
          </p>
          <p style={bulletPointStyle}>
            • <strong>Para Proteger Direitos, Propriedade e Outros:</strong> Podemos divulgar suas informações se acreditarmos que suas ações são inconsistentes com nossos acordos de usuário ou políticas, ou para proteger os direitos, propriedade e segurança do FitFolio ou de outros.
          </p>
          <p style={bulletPointStyle}>
            • <strong>Com Seu Consentimento:</strong> Podemos compartilhar suas informações quando tivermos seu consentimento para fazê-lo, inclusive se o notificarmos por meio de nossos Serviços de que as informações que você fornece serão compartilhadas de uma maneira específica e você fornecer essas informações.
          </p>
          <p style={bulletPointStyle}>
            • <strong>Transferências de Negócios:</strong> Podemos compartilhar ou transferir suas informações em conexão com, ou durante negociações de, qualquer fusão, venda de ativos da empresa, financiamento ou aquisição de todo ou parte de nosso negócio para outra empresa.
          </p>
          <p style={{...paragraphStyle, marginTop: spacing.md}}>
            Não vendemos suas informações pessoais a terceiros.
          </p>

          <h3 style={sectionTitleStyle}>4. Retenção de Dados</h3>
          <p style={paragraphStyle}>
            Armazenamos as informações que coletamos sobre você pelo tempo necessário para o(s) propósito(s) para o(s) qual(is) originalmente as coletamos, ou para outros fins comerciais legítimos, incluindo o cumprimento de nossas obrigações legais, regulatórias ou outras obrigações de conformidade. Se você deseja excluir sua conta ou solicitar que não usemos mais suas informações para fornecer-lhe Serviços, entre em contato conosco no e-mail fornecido abaixo.
          </p>

          <h3 style={sectionTitleStyle}>5. Segurança de Dados</h3>
          <p style={paragraphStyle}>
            O FitFolio toma medidas razoáveis para ajudar a proteger as informações pessoais contra perda, roubo, uso indevido e acesso não autorizado, divulgação, alteração e destruição. No entanto, nenhuma transmissão pela Internet ou por e-mail é totalmente segura ou livre de erros. Portanto, você deve tomar cuidado especial ao decidir quais informações envia para nós por meio dos Serviços ou e-mail. Por favor, tenha isso em mente ao divulgar qualquer informação pessoal ao FitFolio pela Internet.
          </p>

          <h3 style={sectionTitleStyle}>6. Seus Direitos e Escolhas</h3>
          <p style={paragraphStyle}>
            Você tem certos direitos e escolhas em relação às suas informações pessoais:
          </p>
          <p style={bulletPointStyle}>
            • <strong>Informações da Conta:</strong> Você pode atualizar, corrigir ou excluir certas informações da conta a qualquer momento fazendo login nas configurações da sua conta no aplicativo.
          </p>
          <p style={bulletPointStyle}>
            • <strong>Comunicações Promocionais:</strong> Você pode optar por não receber e-mails promocionais de nós seguindo as instruções nesses e-mails. Se você optar por não receber, ainda poderemos enviar-lhe e-mails não promocionais, como aqueles sobre sua conta ou nossos relacionamentos comerciais em andamento.
          </p>
          <p style={bulletPointStyle}>
            • <strong>Informações de Localização:</strong> Você pode controlar como coletamos e usamos informações de localização através das configurações do seu dispositivo.
          </p>
          <p style={bulletPointStyle}>
            • <strong>Acesso, Correção e Exclusão:</strong> Dependendo da sua jurisdição, você pode ter o direito de solicitar acesso, correção ou exclusão de suas informações pessoais. Você pode enviar essas solicitações entrando em contato conosco no endereço de e-mail abaixo.
          </p>

          <h3 style={sectionTitleStyle}>7. Privacidade Infantil</h3>
          <p style={paragraphStyle}>
            Nossos Serviços não são direcionados a indivíduos com menos de 13 anos (ou um limite de idade mais alto quando aplicável pela lei local). Não coletamos intencionalmente informações pessoais de crianças menores de 13 anos. Se tomarmos conhecimento de que uma criança menor de 13 anos nos forneceu informações pessoais, tomaremos medidas para excluir essas informações. Se você souber que uma criança nos forneceu informações pessoais, entre em contato conosco através das informações de contato fornecidas abaixo.
          </p>

          <h3 style={sectionTitleStyle}>8. Transferências Internacionais de Dados</h3>
          <p style={paragraphStyle}>
            Suas informações, incluindo dados pessoais, podem ser transferidas para — e mantidas em — computadores localizados fora do seu estado, província, país ou outra jurisdição governamental onde as leis de proteção de dados podem diferir daquelas de sua jurisdição. Se você está localizado fora do Brasil e opta por nos fornecer informações, observe que transferimos os dados, incluindo dados pessoais, para o Brasil e os processamos lá. Seu consentimento para esta Política de Privacidade, seguido pelo envio de tais informações, representa seu acordo com essa transferência.
          </p>

          <h3 style={sectionTitleStyle}>9. Alterações nesta Política de Privacidade</h3>
          <p style={paragraphStyle}>
            Podemos alterar esta Política de Privacidade de tempos em tempos. Se fizermos alterações, notificaremos você revisando a data no topo da política e, em alguns casos, podemos fornecer um aviso adicional (como adicionar uma declaração em nossa página inicial ou enviar uma notificação por e-mail). Encorajamos você a revisar a Política de Privacidade sempre que acessar os Serviços para se manter informado sobre nossas práticas de informação e as maneiras como você pode ajudar a proteger sua privacidade.
          </p>

          <h3 style={sectionTitleStyle}>10. Contate-nos</h3>
          <p style={paragraphStyle}>
            Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco pelo e-mail fitfolio.app.br@gmail.com ou visite nosso site em fitfolio.com.br.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal; 