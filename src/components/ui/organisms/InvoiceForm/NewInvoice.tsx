"use client"
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import { FormItemType } from '@/types/IInvoices'

export default function NewInvoice() {
    const { data: session } = useSession();
    const router = useRouter();

    const [clientName, setClientName] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [items, setItems] = useState<FormItemType[]>([
        { description: "", rate: "", quantity: "" },
    ]);

    const handleItemChange = (
        index: number,
        field: keyof FormItemType,
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
        setItems((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded">
            <div className="mb-4">
                <label className="block">Nombre del Cliente</label>
                <Input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="border p-2 w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block">Correo Electrónico del Cliente</label>
                <Input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>
            {items.map((item, index) => (
                <div key={index} className="mb-4">
                    <label className="block">Descripción</label>
                    <Input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, "description", e.target.value)}
                        className="border p-2 w-full"
                        required
                    />
                    <label className="block">Precio Unitario</label>
                    <Input
                        type="number"
                        value={item.rate}
                        onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                        className="border p-2 w-full"
                        required
                    />
                    <label className="block">Cantidad</label>
                    <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                        className="border p-2 w-full"
                        required
                    />
                </div>
            ))}
            <div className='flex flex-col lg:flex-row gap-1'>
                <Button
                    type="button"
                    onClick={addItem}
                    className="bg-green-500 text-white px-4 py-2 rounded order-1 cursor-pointer"
                >
                    Agregar otro item
                </Button>
                <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded order-3 md:order-2 cursor-pointer">
                    Crear Factura
                </Button>
                {items.length > 1 && (
                    <Button
                        type="button"
                        onClick={() => removeItem(items.length - 1)}
                        className="bg-red-500 text-white px-4 py-2 rounded order-2 md:order-3 cursor-pointer"
                    >Quitar</Button>
                )}
            </div>
        </form>
    )
}
