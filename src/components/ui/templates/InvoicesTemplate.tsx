'use client'
import { fetchInvoices } from '@/app/services/actions';
import { Invoice } from '@/types/IInvoices';
import { useEffect, useState, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface InvoicesTemplateProps {
    dataInvoices: Invoice[];
    take: number;
}

export default function InvoicesTemplate({ dataInvoices, take }: InvoicesTemplateProps) {
    const [invoices, setInvoices] = useState<Invoice[]>(dataInvoices);
    const [hasMore, setHasMore] = useState(true);
    const [skip, setSkip] = useState(dataInvoices.length);
    const didLoad = useRef(false);
    const { data: session } = useSession();
    const userId = session?.user?.id;


    const loadMoreInvoices = async () => {
        const newInvoices = await fetchInvoices(skip, take, userId);
        if (newInvoices.length < take) {
            setHasMore(false);
        }
        setInvoices(prev => [...prev, ...newInvoices]);
        setSkip(prev => prev + take);
    };

    useEffect(() => {
        if (!didLoad.current) {
            didLoad.current = true;
        }
    }, []);

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
                    const total = invoice.items.reduce(
                        (sum, item) => sum + item.rate * item.quantity,
                        0
                    );
                    return (
                        <Link key={invoice.id} href={`/invoices/detail/${invoice.id}`}>
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
                                <p>Pagos:</p>
                                {invoice.payments.map((payment) => (
                                    <div key={payment.id}>
                                        <p>${payment.amount.toFixed(2)}</p>
                                        <hr />
                                    </div>
                                ))}
                                <p>Cliente: {invoice.clientName} - {invoice.clientEmail}</p>
                            </div>
                        </Link>
                    );
                })}
            </InfiniteScroll>
        </div>
    );
}

