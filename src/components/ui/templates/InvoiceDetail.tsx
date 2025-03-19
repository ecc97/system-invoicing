'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import EditInvoice from '../organisms/InvoiceForm/EditInvoice';
import { Invoice } from '@/types/IInvoices';
import Button from '../atoms/Button';

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
        } catch (error: unknown) {
            const err = error as Error;
            setError(err.message || 'Error al eliminar la factura');
        }
    };

    const handleUpdateSuccess = (updatedInvoice: Invoice) => {
        setInvoice(updatedInvoice);
        setEditing(false);
        setError('');
    };

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-5xl mx-auto bg-sky-100 text-black p-8 rounded-3xl shadow-2xs">
                <h2 className="text-xl font-bold mb-2">Factura: {invoice.id}</h2>
                <div className="flex justify-between items-center">
                    <div className="text-lg font-bold text-gray-800">
                        {invoice.user?.name || invoice.user?.email}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${invoice.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {invoice.status.toUpperCase()}
                    </span>
                </div>

                <div className="mt-2">
                    <p className="text-sm text-gray-600">
                        <span className="font-medium">Fecha:</span> {new Date(invoice.date).toLocaleDateString()}
                    </p>
                </div>

                <div className="pt-4">
                    <p className="text-sm font-medium text-gray-700">Total: {calculateTotal()}</p>
                </div>
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
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Cliente:</span> {invoice.clientName || 'N/A'} - {invoice.clientEmail || 'N/A'}
                        </p>
                        <div className="mt-4">
                            <Button
                                onClick={() => setEditing(true)}
                                className="bg-green-500 text-white w-full md:w-auto px-4 py-2 rounded mr-2 mb-2 md:mb-0"
                            >
                                Editar
                            </Button>
                            <Button
                                onClick={handleDelete}
                                className="bg-red-500 text-white w-full md:w-auto px-4 py-2 rounded"
                            >
                                Eliminar
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
