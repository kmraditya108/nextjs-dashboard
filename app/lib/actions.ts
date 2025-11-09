'use server'
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'})

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['paid', 'pending']),
    date: z.string()
});

const CreateInvoice = FormSchema.omit({id: true, date: true});
const UpdateInvoice = FormSchema.omit({id:true, date:true});

export async function createInvoice(formData:FormData){

    const {customerId, amount, status} = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status')
    });

    // good practice to store monetary values in cents in your database to eliminate JavaScript floating-point errors and ensure greater accuracy.
    const amountInCents = amount*100;

    const date = new Date().toISOString().split('T')[0];

    try {
        await sql`
            INSERT INTO invoices (customer_id, amount, status, date)
            VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;
    } catch (error) {
        console.error("createInvoice error : ", error);
        // return {
        //     message: 'Database Error: Failed to Create Invoice.'
        // }
        throw new Error("Database Error: Failed to Create Invoice.");
        
    }
    
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function updateInvoice(id:string, formData:FormData){
    const {customerId, amount, status} = UpdateInvoice.parse({
        customerId: formData.get('customerId'),
        status: formData.get('status'),
        amount: formData.get('amount')
    });

    const amountInCents = amount*100;
    try {
        await sql`
            UPDATE invoices
            SET customer_id=${customerId}, amount=${amountInCents}, status=${status}
            where id=${id}
        `
    } catch (error) {
        console.error("createInvoice error : ", error);
        return {
            message: 'Database Error: Failed to Update Invoice.'
        }
    }
    

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id:string){
    throw new Error('Failed to Delete Invoice');
    
    await sql`DELETE FROM invoices where id=${id}`;

    revalidatePath('/dashboard/invoices');
}