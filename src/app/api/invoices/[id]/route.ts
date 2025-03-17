import { NextResponse } from 'next/server';
import { InvoiceItem, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
      const invoiceId = (await params).id;
      const invoice = await prisma.invoice.findUnique({
        where: { id: invoiceId },
        include: { user: true, items: true, payments: true },
      });
      if (!invoice) {
        return NextResponse.json({ error: 'Factura no encontrada' }, { status: 404 });
      }
      return NextResponse.json(invoice);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Error obteniendo la factura' }, { status: 500 });
    }
  }

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const invoiceId = (await params).id;
    const body = await request.json();

    const { clientName, clientEmail, status, items } = body;


    const updatedInvoice = await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        clientName: clientName,
        clientEmail: clientEmail,
        status: status,
        date: new Date(),
        items: {
            deleteMany: {}, 
            create: items?.map((item: InvoiceItem) => ({
                description: item.description,
                rate: item.rate,
                quantity: item.quantity,
              })) || [],
        }
        
      },
      include: { user: true, items: true, payments: true },
    });

    return NextResponse.json(updatedInvoice);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating invoice' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const invoiceId = (await params).id;
    await prisma.invoiceItem.deleteMany({ where: { invoiceId } });
    await prisma.payment.deleteMany({ where: { invoiceId } });
    const deletedInvoice = await prisma.invoice.delete({
      where: { id: invoiceId },
    });
    return NextResponse.json(deletedInvoice);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error deleting invoice' }, { status: 500 });
  }
}