import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../api";

export default function Checkout() {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const formRef = useRef(null);
    const [webpayData, setWebpayData] = useState({ url: "", token: "" });

    useEffect(() => {
        const initiatePayment = async () => {
            try {
                const name = searchParams.get("name");
                const email = searchParams.get("email");
                const start_time = searchParams.get("start_time");
                const amount = searchParams.get("amount");

                // Estos son requeridos por el backend actual
                const end_time = searchParams.get("end_time") || start_time;
                const service_name = searchParams.get("service_name") || "Reserva";

                if (!name || !email || !start_time || !amount) {
                    throw new Error("Faltan parámetros obligatorios (name, email, start_time, amount)");
                }

                const response = await api.post("/reserva/crear-pago", {
                    name,
                    email,
                    start_time,
                    end_time,
                    amount: parseInt(amount),
                    service_name
                });

                if (response.data.payment_url && response.data.token) {
                    setWebpayData({
                        url: response.data.payment_url,
                        token: response.data.token
                    });
                } else {
                    throw new Error("Respuesta inválida del servidor");
                }
            } catch (err) {
                console.error("Error iniciando pago:", err);
                setError(err.message || "Error al procesar la reserva");
            } finally {
                setLoading(false);
            }
        };

        initiatePayment();
    }, [searchParams]);

    useEffect(() => {
        if (webpayData.url && webpayData.token) {
            formRef.current.submit();
        }
    }, [webpayData]);

    if (error) {
        return (
            <div style={styles.container}>
                <div style={styles.card}>
                    <h2 style={{ color: "#ef4444" }}>❌ Error</h2>
                    <p>{error}</p>
                    <button style={styles.button} onClick={() => window.history.back()}>
                        Volver
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.spinner}></div>
                <h2>Redirigiendo a Webpay...</h2>
                <p>Por favor, no cierres esta ventana.</p>

                {webpayData.url && (
                    <form ref={formRef} action={webpayData.url} method="POST">
                        <input type="hidden" name="token_ws" value={webpayData.token} />
                    </form>
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
        background: "#f3f4f6",
        fontFamily: "system-ui, sans-serif"
    },
    card: {
        background: "#fff",
        padding: "2rem",
        borderRadius: "1rem",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        textAlign: "center",
        maxWidth: "400px",
        width: "90%"
    },
    spinner: {
        width: "50px",
        height: "50px",
        border: "5px solid #f3f3f3",
        borderTop: "5px solid #3498db",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        margin: "0 auto 1rem auto"
    },
    button: {
        background: "#3b82f6",
        color: "#white",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        cursor: "pointer",
        marginTop: "1rem"
    }
};

// Add keyframes for spinner in a global style or just handle it simply
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(styleSheet);
}
