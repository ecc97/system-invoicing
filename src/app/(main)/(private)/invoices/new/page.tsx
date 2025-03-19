import NewInvoice from "@/components/ui/organisms/InvoiceForm/NewInvoice";

export default function NewInvoicePage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-950 p-4">
      <div className="container mx-auto p-4">
        <div className="max-w-5xl mx-auto bg-sky-100 text-black p-8 rounded-3xl shadow-2xs">
          <h1 className="text-2xl text-center font-bold mb-4">Crear Nueva Factura</h1>
          <NewInvoice />
        </div>
      </div>
    </div>
  );
}
