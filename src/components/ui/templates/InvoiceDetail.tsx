'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Invoice, InvoiceItem } from '@/types/IInvoices'; // Asegúrate de tener definidos los tipos

interface InvoiceDetailProps {
    initialInvoice: Invoice;
}

export default function InvoiceDetail({ initialInvoice }: InvoiceDetailProps) {
    const router = useRouter();
    const [invoice, setInvoice] = useState<Invoice>(initialInvoice);
    const [editing, setEditing] = useState(false);
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
    const [error, setError] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
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
            setInvoice(updatedInvoice);
            setEditing(false);
        } catch (err: any) {
            setError(err.message || 'Error al actualizar la factura');
        }
    };

    const handleDelete = async () => {
        const confirmDelete = confirm('¿Estás seguro de eliminar esta factura?');
        if (!confirmDelete) return;
        try {
            const res = await fetch(`/api/invoices/${invoice.id}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                throw new Error('Error deleting invoice');
            }
            // Por ejemplo, redirige a la lista de facturas luego de eliminar
            router.push('/invoices');
        } catch (err: any) {
            setError(err.message || 'Error al eliminar la factura');
        }
    };

    return (
        <div className="p-4 border rounded">
            <h2 className="text-xl font-bold mb-2">Factura: {invoice.id}</h2>
            <p>Propiedad: {invoice.user?.name || invoice.user?.email}</p>
            <p>Fecha: {new Date(invoice.date).toLocaleDateString()}</p>
            <p>
                Total:{' '}
                {invoice.items
                    .reduce((sum, item) => sum + item.rate * item.quantity, 0)
                    .toFixed(2)}
            </p>
            {error && <p className="text-red-500">{error}</p>}

            {editing ? (
                <div className="mt-4">
                    <label className="block">
                        Nombre del Cliente:
                        <input
                            type="text"
                            name="clientName"
                            value={formData.clientName}
                            onChange={handleInputChange}
                            className="border p-1 w-full"
                        />
                    </label>
                    <label className="block mt-2">
                        Correo del Cliente:
                        <input
                            type="email"
                            name="clientEmail"
                            value={formData.clientEmail}
                            onChange={handleInputChange}
                            className="border p-1 w-full"
                        />
                    </label>
                    <label className="block mt-2">
                        Estado:
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="border p-1 w-full"
                        >
                            <option value="pending" className='text-black'>Pending</option>
                            <option value="paid" className='text-black'>Paid</option>
                            {/* Agrega otros estados si es necesario */}
                        </select>
                    </label>
                    <h3 className="text-lg font-bold mt-4">Items</h3>
                    <div className="flex flex-col gap-4">
                        {formData.items.map((item, index) => (
                            <div key={index} className="mb-4 flex flex-col gap-4 md:flex-row md:gap-2">
                                <input type="text" value={item.description} onChange={(e) => handleItemChange(index, "description", e.target.value)} className="border p-1"/>
                                <input type="number" value={item.rate} onChange={(e) => handleItemChange(index, "rate", e.target.value)} className="border p-1"/>
                                <input type="number" value={item.quantity} onChange={(e) => handleItemChange(index, "quantity", e.target.value)} className="border p-1"/>
                                <button onClick={() => removeItem(index)} className="bg-red-500 text-white px-4 py-2 rounded">Eliminar</button>
                                <button onClick={addItem} className="bg-green-500 text-white px-4 py-2 rounded">Agregar Item</button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <button
                            onClick={handleUpdate}
                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Guardar
                        </button>
                        <button
                            onClick={() => setEditing(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            ) : (
                <div className="mt-4">
                    <p>
                        Cliente: {invoice.clientName} - {invoice.clientEmail}
                    </p>
                    <p>Estado: {invoice.status}</p>
                    <div className="mt-4">
                        <button
                            onClick={() => setEditing(true)}
                            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Editar
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
