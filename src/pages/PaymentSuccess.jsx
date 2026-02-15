export default function PaymentSuccess() {
    const whatsappNumber = "56912345678"; // CAMBIA ESTO
    const message = encodeURIComponent(
        "Hola 👋 ya realicé el pago exitosamente, quiero continuar con mi pedido."
    );

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.icon}>✅</div>

                <h1 style={styles.title}>¡Pago exitoso!</h1>

                <p style={styles.text}>
                    Tu pago fue procesado correctamente.
                    <br />
                    Puedes continuar tu compra por WhatsApp.
                </p>

                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <button style={styles.button}>
                        Continuar en WhatsApp
                    </button>
                </a>

                <p style={styles.small}>
                    Gracias por tu compra 💚
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
    },
    card: {
        background: "#ffffff",
        borderRadius: "16px",
        padding: "40px",
        maxWidth: "420px",
        width: "100%",
        textAlign: "center",
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    },
    icon: {
        fontSize: "64px",
        marginBottom: "10px",
    },
    title: {
        margin: "10px 0",
        fontSize: "28px",
        color: "#1f2937",
    },
    text: {
        fontSize: "16px",
        color: "#4b5563",
        marginBottom: "30px",
    },
    button: {
        background: "#25D366",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        padding: "14px 24px",
        fontSize: "16px",
        cursor: "pointer",
        fontWeight: "600",
    },
    small: {
        marginTop: "20px",
        fontSize: "13px",
        color: "#9ca3af",
    },
};