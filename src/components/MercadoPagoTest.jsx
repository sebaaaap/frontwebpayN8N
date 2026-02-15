import { useState } from "react";
import { api } from "../api";

export default function MercadoPagoTest() {
    const [loading, setLoading] = useState(false);

    const createPreference = async () => {
        setLoading(true);
        try {
            const res = await api.post("/mp/create-preference", {
                items: [
                    { name: "Suculenta", price: 5000, quantity: 1 },
                    { name: "Cactus", price: 7000, quantity: 1 },
                ],
            });

            window.location.href = res.data.init_point;
        } catch (err) {
            alert("Error MercadoPago");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h2>💳 MercadoPago</h2>

            <button onClick={createPreference} disabled={loading}>
                {loading ? "Creando..." : "Pagar con MercadoPago"}
            </button>
        </>
    );
}