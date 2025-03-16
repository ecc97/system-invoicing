import { Invoice } from "@/types/IInvoices";

export async function fetchInvoices(skipValue: number, take: number): Promise<Invoice[]>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/invoices?skip=${skipValue}&take=${take}`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Error fetching invoices");
    }
    const data = await res.json();
    return data;
}