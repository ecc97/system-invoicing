import { Invoice } from '@/types/IInvoices';
import React from 'react'

interface InvoiceListProps {
    invoice: Invoice;
    total: number;
}

export default function InvoiceCard({ invoice, total }: InvoiceListProps) {
    return (
        <div className="border p-4 rounded mb-2 cursor-pointer">
            <p>Propiedad: {invoice.user?.name || invoice.user?.email}</p>
            <p>ID: {invoice.id}</p>
            <p>Estado: {invoice.status}</p>
            <p>Total: ${total.toFixed(2)}</p>
            <p>Fecha: {new Date(invoice.date).toLocaleDateString()}</p>
            <p>Items:</p>
            {invoice.items.map((item) => (
                <div key={item.id}>
                    <p>{item.description} - ${item.rate.toFixed(2)} x {item.quantity}</p>
                    <hr />
                </div>
            ))}
            {/* <p>Pagos:</p>
            {invoice.payments.map((payment) => (
                <div key={payment.id}>
                    <p>${payment.amount.toFixed(2)}</p>
                    <hr />
                </div>
            ))} */}
            <p>Cliente: {invoice.clientName} - {invoice.clientEmail}</p>
        </div>
    )
}
