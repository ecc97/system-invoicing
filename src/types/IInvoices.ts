export type InvoiceItem = {
    id: string;
    description: string;
    rate: number;
    quantity: number;
};

export type Payment = {
    id: string;
    amount: number;
};

export type User = {
    id: string;
    name: string;
    email: string;
};

export type Invoice = {
    id: string;
    user: User;
    date: string;
    status: string;
    clientName: string;
    clientEmail: string;
    items: InvoiceItem[];
    payments: Payment[];
};