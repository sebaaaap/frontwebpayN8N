import Products from "./components/Products";
import WebPayTest from "./components/Webpaytest";
import MercadoPagoTest from "./components/MercadoPagoTest";

export default function App() {
  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>🧪 Test Pagos</h1>

      <Products />

      <hr />

      <WebPayTest />

      <hr />

      <MercadoPagoTest />
    </div>
  );
}