import { useState } from "react";
import { api } from "../api";

export default function WebPayTest() {
    const [amount, setAmount] = useState("5000");
    const [result, setResult] = useState(null);

    const createPayment = async () => {
        try {
            const res = await api.post("/create-payment", { amount: Number(amount) });
            setResult(res.data);

            // redirige a WebPay
            window.location.href = `${res.data.payment_url}?token_ws=${res.data.token}`;
        } catch (err) {
            alert("Error creando pago");
            console.error(err);
        }
    };

    return (
        <>
            <h2>🏦 WebPay</h2>

            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            <button onClick={createPayment} style={{ marginLeft: 10 }}>
                Pagar con WebPay
            </button>

            {result && (
                <pre>{JSON.stringify(result, null, 2)}</pre>
            )}
        </>
    );
}