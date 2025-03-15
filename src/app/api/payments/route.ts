import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { invoiceId, amount } = await request.json()

    // Crear el pago
    const payment = await prisma.payment.create({
      data: {
        invoiceId,
        amount,
      },
    })

    // Calcular el total de la factura a partir de los items
    const items = await prisma.invoiceItem.findMany({ where: { invoiceId } })
    const totalInvoice = items.reduce((sum, item) => sum + (item.rate * item.quantity), 0)

    // Sumar los pagos ya realizados
    const payments = await prisma.payment.findMany({ where: { invoiceId } })
    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0)

    // Actualizar el estado de la factura
    const newStatus = totalPaid >= totalInvoice ? 'paid' : 'pending'
    await prisma.invoice.update({
      where: { id: invoiceId },
      data: { status: newStatus },
    })

    return NextResponse.json(payment)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error registrando el pago' }, { status: 500 })
  }
}