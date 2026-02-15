import { useEffect, useState } from "react";
import { api } from "../api";

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get("/products").then((res) => setProducts(res.data));
    }, []);

    return (
        <>
            <h2>📦 Productos</h2>
            <ul>
                {products.map((p) => (
                    <li key={p.id}>
                        {p.name} — ${p.price}
                    </li>
                ))}
            </ul>
        </>
    );
}