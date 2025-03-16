'use client'
import { useEffect, useState } from 'react'

type InvoiceItem = {
  id: string
  description: string
  rate: number
  quantity: number
}

type Payment = {
  id: string
  amount: number
}

type User = {
  id: string
  name: string
  email: string
}


type Invoice = {
  id: string
  user: User
  date: string
  status: string
  clientName: string
  clientEmail: string
  items: InvoiceItem[]
  payments: Payment[]
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])

  useEffect(() => {
    fetch('/api/invoices')
      .then((res) => res.json())
      .then((data) => setInvoices(data))
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Facturas</h1>
      {invoices.map((invoice) => {
        // Calcular el total de la factura a partir de los items
        const total = invoice.items.reduce(
          (sum, item) => sum + item.rate * item.quantity,
          0
        )
        return (
          <div key={invoice.id} className="border p-4 rounded mb-2">
            <p>Propiedad: {invoice.user?.name || invoice.user?.email}</p>
            <p>ID: {invoice.id}</p>
            <p>Estado: {invoice.status}</p>
            <p>Total: ${total.toFixed(2)}</p>
            <p>Fecha: {new Date(invoice.date).toLocaleDateString()}</p>
            {/* Puedes listar los items y pagos si lo deseas */}
            <p>Items:</p>
            {invoice.items.map((item) => (
              <div key={item.id}>
                <p>{item.description} - ${item.rate.toFixed(2)} x {item.quantity}</p>
                <hr />
              </div>
            ))}
            <p>Pagos:</p>
            {invoice.payments.map((payment) => (
              <div key={payment.id}>
                <p>${payment.amount.toFixed(2)}</p>
                <hr />
              </div>
            ))}
            <p>Cliente: {invoice.clientName} - {invoice.clientEmail}</p>
          </div>
        )
      })}
    </div>
  )
}
