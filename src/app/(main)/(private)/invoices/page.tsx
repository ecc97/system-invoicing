import { fetchInvoices } from "@/app/services/actions";
import InvoicesTemplate from "@/components/ui/templates/InvoicesTemplate";

type Params = Promise<{ take?: string; skip?: string }>;

export default async function InvoicesPage({ searchParams }: { searchParams: Params }) {
  const take = (await searchParams).take ? Number((await searchParams).take) : 5;
  const skip = (await searchParams).skip ? Number((await searchParams).skip) : 0;
  const initialInvoices = await fetchInvoices(skip, take);
  return <InvoicesTemplate dataInvoices={initialInvoices} take={take} />;
}