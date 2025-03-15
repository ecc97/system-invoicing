import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { userId, clientName, clientEmail, items } = await request.json()

    const invoice = await prisma.invoice.create({
      data: {
        userId,
        clientName,
        clientEmail,
        items: {
          create: items.map((item: any) => ({
            description: item.description,
            rate: item.rate,
            quantity: item.quantity,
          })),
        },
      },
    })

    return NextResponse.json(invoice)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error creando la factura' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      include: { user: true, items: true, payments: true },
    })
    return NextResponse.json(invoices)
  } catch (error) {
    return NextResponse.json({ error: 'Error obteniendo facturas' }, { status: 500 })
  }
}