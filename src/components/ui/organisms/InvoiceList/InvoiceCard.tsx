import { Invoice } from '@/types/IInvoices';
import React from 'react'

interface InvoiceListProps {
    invoice: Invoice;
    total: number;
}

export default function InvoiceCard({ invoice, total }: InvoiceListProps) {
    return (
        <div className="bg-sky-50 border shadow-lg rounded-xl my-2 p-6 transition hover:shadow-xl cursor-pointer" title='Ver Factura'>
            {/* Encabezado con usuario y estado */}
            <div className="flex justify-between items-center">
                <div className="text-lg font-bold text-gray-800">
                    {invoice.user?.name || invoice.user?.email}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${invoice.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {invoice.status.toUpperCase()}
                </span>
            </div>

            {/* Información básica */}
            <div className="mt-2">
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Factura ID:</span> {invoice.id}
                </p>
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Fecha:</span> {new Date(invoice.date).toLocaleDateString()}
                </p>
            </div>

            {/* Total */}
            <div className="mt-4 border-t pt-4">
                <p className="text-sm font-medium text-gray-700">
                    Total: <span className="text-xl font-bold text-green-600">${total.toFixed(2)}</span>
                </p>
            </div>

            {/* Lista de Items */}
            <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-800">Items:</h3>
                <ul className="mt-2 space-y-1">
                    {invoice.items.map((item) => (
                        <li key={item.id} className="text-sm text-gray-600">
                            {item.description} - ${item.rate.toFixed(2)} x {item.quantity}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Información del Cliente */}
            <div className="mt-4">
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Cliente:</span> {invoice.clientName || 'N/A'} - {invoice.clientEmail || 'N/A'}
                </p>
            </div>
        </div>
    )
}
