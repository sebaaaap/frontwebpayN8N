import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { api } from "../api";

export default function PaymentResult() {
    const confirmed = useRef(false);
    const [params] = useSearchParams();
    const [status, setStatus] = useState("loading"); // loading, success, failure
    const [details, setDetails] = useState(null);
    const token = params.get("token_ws");

    useEffect(() => {
        if (!token) {
            setStatus("failure");
            return;
        }

        if (confirmed.current) return;
        confirmed.current = true;

        api.post("/confirm-payment", { token })
            .then((res) => {
                if (res.data.success) {
                    setStatus("success");
                    setDetails(res.data.details);
                } else {
                    setStatus("failure");
                }
            })
            .catch((err) => {
                console.error("Error confirmando pago:", err);
                setStatus("failure");
            });
    }, [token]);

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {status === "loading" && (
                    <>
                        <div style={styles.spinner}></div>
                        <h2>Confirmando tu pago...</h2>
                        <p>Por favor espera un momento.</p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <div style={styles.iconSuccess}>✅</div>
                        <h1 style={styles.title}>¡Pago Confirmado!</h1>
                        <p style={styles.text}>
                            Tu cita se está agendando automáticamente. <br />
                            Recibirás una confirmación en tu correo pronto.
                        </p>
                        <div style={styles.details}>
                            <p><strong>Orden:</strong> {details?.buy_order}</p>
                            <p><strong>Monto:</strong> ${details?.amount?.toLocaleString()}</p>
                        </div>
                        <button
                            style={styles.buttonWhatsApp}
                            onClick={() => window.location.href = "https://wa.me/569XXXXXXXX"}
                        >
                            Volver al Chat
                        </button>
                        <button style={styles.buttonSecondary} onClick={() => window.location.href = "/"}>
                            Ir al Inicio
                        </button>
                    </>
                )}

                {status === "failure" && (
                    <>
                        <div style={styles.iconFailure}>❌</div>
                        <h1 style={styles.title}>Pago Fallido</h1>
                        <p style={styles.text}>
                            No pudimos procesar tu pago o la transacción fue cancelada.
                        </p>
                        <button style={styles.buttonFailure} onClick={() => window.location.href = "/"}>
                            Reintentar
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
        fontFamily: "system-ui, sans-serif",
        padding: "20px"
    },
    card: {
        background: "#fff",
        padding: "3rem 2rem",
        borderRadius: "1.5rem",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        textAlign: "center",
        maxWidth: "450px",
        width: "100%"
    },
    spinner: {
        width: "50px",
        height: "50px",
        border: "5px solid #f3f3f3",
        borderTop: "5px solid #10b981",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        margin: "0 auto 1.5rem auto"
    },
    iconSuccess: {
        fontSize: "80px",
        marginBottom: "1rem",
        animation: "bounce 1s ease"
    },
    iconFailure: {
        fontSize: "80px",
        marginBottom: "1rem"
    },
    title: {
        fontSize: "2rem",
        fontWeight: "800",
        color: "#111827",
        marginBottom: "1rem"
    },
    text: {
        color: "#4b5563",
        fontSize: "1.1rem",
        lineHeight: "1.6",
        marginBottom: "2rem"
    },
    details: {
        background: "#f9fafb",
        padding: "1rem",
        borderRadius: "0.75rem",
        marginBottom: "2rem",
        textAlign: "left",
        fontSize: "0.9rem"
    },
    buttonWhatsApp: {
        background: "#25D366",
        color: "#fff",
        border: "none",
        padding: "0.75rem 2rem",
        borderRadius: "0.75rem",
        fontSize: "1rem",
        fontWeight: "700",
        cursor: "pointer",
        transition: "all 0.2s",
        width: "100%",
        marginBottom: "0.75rem",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    },
    buttonSecondary: {
        background: "#f3f4f6",
        color: "#4b5563",
        border: "1px solid #e5e7eb",
        padding: "0.75rem 2rem",
        borderRadius: "0.75rem",
        fontSize: "1rem",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.2s",
        width: "100%"
    },
    buttonFailure: {
        background: "#ef4444",
        color: "#fff",
        border: "none",
        padding: "0.75rem 2rem",
        borderRadius: "0.75rem",
        fontSize: "1rem",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.2s",
        width: "100%"
    }
};

if (typeof document !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(styleSheet);
}