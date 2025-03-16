'use client'
import { useEffect, useState, useRef } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';

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
  const [hasMore, setHasMore] = useState(true)
  const [skip, setSkip] = useState(0);
  const take = 5;
  const didLoad = useRef(false);

  const fetchInvoices = async (skipValue: number) => {
    const res = await fetch(`/api/invoices?skip=${skipValue}&take=${take}`)
    const data = await res.json()
    return data as Invoice[]
  }

  const loadMoreInvoices = async () => {
    const newInvoices = await fetchInvoices(skip)
    if (newInvoices.length < take) {
      setHasMore(false)
    }
    setInvoices(prev => [...prev, ...newInvoices])
    setSkip(prev => prev + take)
  }

  useEffect(() => {
    if (!didLoad.current) {
      loadMoreInvoices()
      didLoad.current = true
    }
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Facturas</h1>
      <InfiniteScroll
        dataLength={invoices.length}
        next={loadMoreInvoices}
        hasMore={hasMore}
        loader={<h4>Cargando...</h4>}
        endMessage={
          <p className='text-center'>
            <b>No hay más facturas para cargar</b>
          </p>
        }
        className="overflow-y-auto"
      >
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
      </InfiniteScroll>
    </div>
  )
}
