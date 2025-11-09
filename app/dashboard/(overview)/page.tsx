// "use client"

// import { Card } from "@/app/ui/dashboard/cards";

import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";
// import { revenue } from "@/app/lib/placeholder-data";
// import { fetchRevenue, fetchLatestInvoices, fetchCardData } from "@/app/lib/data";
import { fetchLatestInvoices, fetchCardData } from "@/app/lib/data";
import { Suspense } from "react";
import { CardSkeleton, RevenueChartSkeleton } from "@/app/ui/skeletons";
import CardWrapper from "@/app/ui/dashboard/cards";


export default async function Page() {
    // const revenue = await fetchRevenue();
    const latestInvoices = await fetchLatestInvoices();
    // const {numberOfCustomers, numberOfInvoices, totalPaidInvoices, totalPendingInvoices} = await fetchCardData();
    // console.log("cardData: ", cardData);
    
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dashboard Page---</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* <Card title="Collected" value={totalPaidInvoices} type="collected"/>
                <Card title="Pending" value={totalPendingInvoices} type="pending"/>
                <Card title="Total invoice" value={numberOfInvoices} type="invoices"/>
                <Card title="Total customers" value={numberOfCustomers} type="customers"/> */}
                <Suspense fallback={<CardSkeleton/>}>
                    <CardWrapper/>
                </Suspense>
            </div>

            <div className="grid gap-6 sm:grid-cols2 md:grid-gap-4 lg:grid-gap-8">
                {/* <RevenueChart revenue={revenue}/> */}
                <Suspense fallback={<RevenueChartSkeleton/>}>
                    <RevenueChart/>
                </Suspense>
                <LatestInvoices latestInvoices={latestInvoices}/>
            </div>
        </main>
        // <p>Dashboard page</p>
    )
}