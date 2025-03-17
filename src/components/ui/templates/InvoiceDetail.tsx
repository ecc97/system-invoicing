'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import EditInvoice from '../organisms/InvoiceForm/EditInvoice';
import { Invoice } from '@/types/IInvoices';

interface InvoiceDetailProps {
    initialInvoice: Invoice;
}

export default function InvoiceDetail({ initialInvoice }: InvoiceDetailProps) {
    const router = useRouter();
    const [invoice, setInvoice] = useState<Invoice>(initialInvoice);
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState<string>('');

    const calculateTotal = () => {
        return invoice.items
            .reduce((sum, item) => sum + item.rate * item.quantity, 0)
            .toFixed(2);
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
            router.push('/invoices');
        } catch (err: any) {
            setError(err.message || 'Error al eliminar la factura');
        }
    };

    const handleUpdateSuccess = (updatedInvoice: Invoice) => {
        setInvoice(updatedInvoice);
        setEditing(false);
        setError('');
    };

    return (
        <div className="p-4 border rounded">
            <h2 className="text-xl font-bold mb-2">Factura: {invoice.id}</h2>
            <p>Propiedad: {invoice.user?.name || invoice.user?.email}</p>
            <p>Fecha: {new Date(invoice.date).toLocaleDateString()}</p>
            <p>Total: {calculateTotal()}</p>
            {error && <p className="text-red-500">{error}</p>}

            {editing ? (                                                                                                                        
                <EditInvoice
                    invoice={invoice}                   
                    onUpdateSuccess={handleUpdateSuccess}               
                    onCancel={() => setEditing(false)}                                                                                                                                                                                                                               
                    onError={setError}
                />
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
