export default function PaymentFailure() {
    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.icon}>❌</div>
                <h1 style={styles.title}>Pago Fallido</h1>
                <p style={styles.text}>
                    Hubo un problema al procesar tu pago. <br />
                    Por favor, intenta nuevamente o contacta a soporte.
                </p>
                <a href="/">
                    <button style={styles.button}>Volver al inicio</button>
                </a>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a1a, #333333)",
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
        background: "#ef4444",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        padding: "12px 24px",
        fontSize: "16px",
        cursor: "pointer",
        fontWeight: "600",
    },
};
