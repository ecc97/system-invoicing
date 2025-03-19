"use client"
import React, { useState } from 'react'
import { Invoice, FormItemType } from '@/types/IInvoices';
import Input from '../../atoms/Input';
import Select from '../../atoms/Select';
import Button from '../../atoms/Button';

interface EditInvoiceProps {
    invoice: Invoice
    onUpdateSuccess: (updatedInvoice: Invoice) => void
    onCancel: () => void
    onError: (error: string) => void
}

export default function EditInvoice({invoice, onUpdateSuccess, onCancel, onError}: EditInvoiceProps) {
    const [formData, setFormData] = useState({
        clientName: invoice.clientName || '',
        clientEmail: invoice.clientEmail || '',
        status: invoice.status,
        items: invoice.items.map(item => ({
            description: item.description || '',
            rate: item.rate.toString() || 0,
            quantity: item.quantity.toString() || 1,
        }))
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleItemChange = (index: number, field: keyof FormItemType, value: string | number) => {
        setFormData(prev => {
            const updatedItems = [...prev.items];
            updatedItems[index] = { ...updatedItems[index], [field]: value };
            return { ...prev, items: updatedItems };
        });
    };

    const addItem = () => {
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, { description: '', rate: 0, quantity: 1 }],
        }));
    };

    const removeItem = (index: number) => {
        if (formData.items.length <= 1) {
            onError('La factura debe tener al menos un item');
            return;
        }
        setFormData(prev => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index),
        }));
    };

    const handleUpdate = async () => {
        const formattedItems = formData.items.map((item: { description: string; rate: string | number; quantity: string | number; }) => ({
            description: item.description,
            rate: parseFloat(item.rate.toString()) || 0,
            quantity: parseInt(item.quantity.toString()) || 0,
        }));

        try {
            const res = await fetch(`/api/invoices/${invoice.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, items: formattedItems }),
            });
            if (!res.ok) {
                throw new Error('Error updating invoice');
            }
            const updatedInvoice = await res.json();
            onUpdateSuccess(updatedInvoice);
        } catch (error: unknown) {
            const err = error as Error;
            onError(err.message || 'Error al actualizar la factura');
        }
    };

    return (
        <div className="mt-4">
            <label className="block">
                Nombre del Cliente:
                <Input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    className="border p-1 w-full"
                    required
                />
            </label>
            <label className="block mt-2">
                Correo del Cliente:
                <Input
                    type="email"
                    name="clientEmail"
                    value={formData.clientEmail}
                    onChange={handleInputChange}
                    className="border p-1 w-full"
                />
            </label>
            <label className="block mt-2">
                Estado:
                <Select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="border p-1 w-full"
                    options={[
                        { value: 'pending', label: 'Pendiente' },
                        { value: 'paid', label: 'Pagado' },
                    ]}
                 />
            </label>
            <h3 className="text-lg font-bold mt-4">Items</h3>
            <div className="flex flex-col gap-4">
                {formData.items.map((item, index) => (
                    <div key={index} className="mb-4 flex flex-col gap-4 md:flex-row md:gap-2">
                        <div className='flex flex-col'>
                            <label className="block">Descripción</label>
                            <Input type="text" value={item.description} onChange={(e) => handleItemChange(index, "description", e.target.value)} className="border p-1" required />
                        </div>
                        <div className='flex flex-col'>
                            <label className="block">Precio</label>
                            <Input type="number" value={item.rate} onChange={(e) => handleItemChange(index, "rate", e.target.value)} className="border p-1" required />
                        </div>
                        <div className='flex flex-col'>    
                            <label className="block">Cantidad</label>
                            <Input type="number" value={item.quantity} onChange={(e) => handleItemChange(index, "quantity", e.target.value)} className="border p-1" required />
                        </div>    
                        <Button onClick={() => removeItem(index)} className="bg-red-500 text-white px-4 py-2 md:py-0 rounded">Eliminar</Button>
                        <Button onClick={addItem} className="bg-green-500 text-white px-4 py-2 md:py-0 rounded">Agregar Item</Button>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <Button
                    onClick={handleUpdate}
                    className="bg-blue-500 text-white w-full md:w-auto px-4 py-2 rounded mr-2 mb-2 md:mb-0 cursor-pointer"
                >
                    Guardar
                </Button>
                <Button
                    onClick={onCancel}
                    className="bg-gray-500 text-white w-full md:w-auto px-4 py-2 rounded cursor-pointer"
                >
                    Cancelar
                </Button>
            </div>
        </div>
    )
}
