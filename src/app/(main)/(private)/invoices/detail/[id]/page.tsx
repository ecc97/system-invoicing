import InvoiceDetail from "@/components/ui/templates/InvoiceDetail";

export default async function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {

    const id = (await params).id;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/invoices/${id}`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Error fetching invoice details");
    }
    const invoice = await res.json();
  
    return <InvoiceDetail initialInvoice={invoice} />;
  }