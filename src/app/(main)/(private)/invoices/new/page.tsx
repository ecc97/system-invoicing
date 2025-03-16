'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface InvoiceItem {
  description: string;
  rate: string;
  quantity: string;
}

export default function NewInvoicePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: "", rate: "", quantity: "" },
  ]);

  const handleItemChange = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    setItems((prev) => {
      const newItems = [...prev];
      newItems[index] = { ...newItems[index], [field]: value };
      return newItems;
    });
  };

  const addItem = () => {
    setItems((prev) => [...prev, { description: "", rate: "", quantity: "" }]);
  };

  const removeItem = (index: number) => {
    setItems((prev) => [...prev.slice(0, index),...prev.slice(index + 1)]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Obtener el userId de la sesión
    const userId = session?.user?.id;
    if (!userId) {
      console.error("Usuario no autenticado");
      return;
    }

    const formattedItems = items.map(item => ({
      description: item.description,
      rate: parseFloat(item.rate) || 0,
      quantity: parseInt(item.quantity) || 0,
    }));

    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, clientName, clientEmail, items: formattedItems }),
    });

    if (res.ok) {
      console.log("Factura creada");
      router.push("/invoices");
    } else {
      console.error("Error al crear la factura");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Nueva Factura</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded">
        {/* Campos opcionales para el cliente */}
        <div className="mb-4">
          <label className="block">Nombre del Cliente</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">Correo Electrónico del Cliente</label>
          <input
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        {/* Ya no se pide el ID de usuario, se obtiene de la sesión */}
        {items.map((item, index) => (
          <div key={index} className="mb-4">
            <label className="block">Descripción</label>
            <input
              type="text"
              value={item.description}
              onChange={(e) => handleItemChange(index, "description", e.target.value)}
              className="border p-2 w-full"
            />
            <label className="block">Precio Unitario</label>
            <input
              type="number"
              value={item.rate}
              onChange={(e) => handleItemChange(index, "rate", e.target.value)}
              className="border p-2 w-full"
            />
            <label className="block">Cantidad</label>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
              className="border p-2 w-full"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Agregar otro item
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Crear Factura
        </button>
        {items.length > 1 && (
            <button
              type="button"
              onClick={() => removeItem(items.length - 1)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >Quitar</button>
        )}
      </form>
    </div>
  );
}
