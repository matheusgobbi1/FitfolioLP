import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import waitlistFormStyles, {
  waitlistFormMediaStyles,
} from "../styles/components/waitlistForm";
import { mergeStyles } from "../styles/utils";
import { useResponsiveStyles } from "../hooks/useResponsiveStyles";
import Button from "./Button";
import { addToWaitlist } from "../services/waitlistService";
import { useTranslation } from "react-i18next";

type SubmissionStatus = "idle" | "loading" | "success" | "error";

interface WaitlistFormProps {
  disableAnimations?: boolean;
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({
  disableAnimations = false,
}) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const waitlistFormStyle = useResponsiveStyles(
    waitlistFormStyles,
    waitlistFormMediaStyles,
    "waitlistForm"
  );
  const waitlistFormContainerStyle = useResponsiveStyles(
    waitlistFormStyles,
    waitlistFormMediaStyles,
    "waitlistFormContainer"
  );
  const waitlistFormTitleStyle = useResponsiveStyles(
    waitlistFormStyles,
    waitlistFormMediaStyles,
    "waitlistFormTitle"
  );
  const waitlistFormDescriptionStyle = useResponsiveStyles(
    waitlistFormStyles,
    waitlistFormMediaStyles,
    "waitlistFormDescription"
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || status === "loading") return;

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage(
        t("waitlist.invalidEmail", "Por favor, insira um email válido.")
      );
      return;
    }

    try {
      setStatus("loading");

      // Chamar o serviço para adicionar o email à lista de espera
      const result = await addToWaitlist(email);

      if (result.success) {
        setStatus("success");
        setMessage(result.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(result.message);
      }
    } catch (error) {
      setStatus("error");
      const errorMessage = t(
        "waitlist.error",
        "Algo deu errado. Por favor, tente novamente."
      );

      if (error instanceof Error) {
        console.error("Detalhes do erro:", error.message);
      }

      setMessage(errorMessage);
      console.error("Erro ao processar inscrição:", error);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (status !== "idle") {
      setStatus("idle");
      setMessage("");
    }
  };

  const getInputStyle = () => {
    if (status === "loading") {
      return mergeStyles(
        waitlistFormStyles.inputEmail,
        waitlistFormStyles.inputEmailDisabled
      );
    }
    if (isFocused) {
      return mergeStyles(
        waitlistFormStyles.inputEmail,
        waitlistFormStyles.inputEmailFocus
      );
    }
    return waitlistFormStyles.inputEmail;
  };

  const getStatusMessageStyle = () => {
    if (status === "success") {
      return mergeStyles(
        waitlistFormStyles.statusMessage,
        waitlistFormStyles.statusSuccess
      );
    }
    if (status === "error") {
      return mergeStyles(
        waitlistFormStyles.statusMessage,
        waitlistFormStyles.statusError
      );
    }
    return mergeStyles(
      waitlistFormStyles.statusMessage,
      waitlistFormStyles.statusLoading
    );
  };

  // Estilo personalizado para o botão com animação de hover
  const buttonContainerStyle: React.CSSProperties = {
    position: "relative",
    overflow: "visible",
    borderRadius: "0.5rem",
    transition: "all 0.3s ease",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  };

  return (
    <div style={waitlistFormContainerStyle}>
      <h3
        style={waitlistFormTitleStyle}
        className={
          disableAnimations ? "" : "animate-fadeInUp animate-delay-100"
        }
      >
        {t(
          "waitlist.title",
          "Quer testar o FitFolio antes do lançamento oficial?"
        )}
      </h3>
      <p
        style={waitlistFormDescriptionStyle}
        className={
          disableAnimations ? "" : "animate-fadeInUp animate-delay-200"
        }
      >
        {t(
          "waitlist.description",
          "Entre para o teste beta, enviaremos o link para você."
        )}
      </p>

      <form
        onSubmit={handleSubmit}
        style={waitlistFormStyle}
        className={
          disableAnimations ? "" : "animate-fadeInUp animate-delay-300"
        }
      >
        <input
          type="email"
          placeholder={t("waitlist.emailPlaceholder", "Seu endereço de email")}
          style={getInputStyle()}
          value={email}
          onChange={handleEmailChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={status === "loading"}
          required
          aria-label="Email address"
          className={
            disableAnimations ? "" : "animate-fadeInLeft animate-delay-400"
          }
        />

        <div
          style={buttonContainerStyle}
          className={
            disableAnimations ? "" : "animate-fadeInRight animate-delay-500"
          }
        >
          <Button
            type="submit"
            isLoading={status === "loading"}
            disabled={status === "loading"}
            ariaLabel={
              status === "loading"
                ? t("waitlist.sending", "Enviando...")
                : t("waitlist.join", "Entrar na lista de espera")
            }
            size="md"
            fullWidth={true}
          >
            {status === "loading"
              ? t("waitlist.sending", "Enviando...")
              : t("waitlist.joinButton", "Entrar")}
          </Button>
        </div>
      </form>

      {/* Status Message */}
      {status !== "idle" && (
        <div
          style={getStatusMessageStyle()}
          role="status"
          aria-live="polite"
          className={disableAnimations ? "" : "animate-fadeIn"}
        >
          {status === "success" && (
            <CheckCircle style={{ width: "1rem", height: "1rem" }} />
          )}
          {status === "error" && (
            <XCircle style={{ width: "1rem", height: "1rem" }} />
          )}
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

export default WaitlistForm;
