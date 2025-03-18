import { NextResponse } from 'next/server'
import { InvoiceItem, PrismaClient } from '@prisma/client'

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
          create: items.map((item: InvoiceItem) => ({
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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const skip = parseInt(searchParams.get("skip") || "0");
    const take = parseInt(searchParams.get("take") || "5");
    const userId = searchParams.get("userId");

    const whereClause = userId ? { userId } : {};

    const invoices = await prisma.invoice.findMany({
      skip,
      take,
      where: whereClause,
      include: { user: true, items: true, payments: true },
      orderBy: { date: 'desc' },
    })
    return NextResponse.json(invoices)
  } catch (error: unknown) {
    const err = error as Error
    const errorMessage = err.message || 'Error obteniendo facturas'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}