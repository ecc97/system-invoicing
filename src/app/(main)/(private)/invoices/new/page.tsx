import NewInvoice from "@/components/ui/organisms/InvoiceForm/NewInvoice";

export default function NewInvoicePage() {

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Nueva Factura</h1>
      <NewInvoice />
    </div>
  );
}
