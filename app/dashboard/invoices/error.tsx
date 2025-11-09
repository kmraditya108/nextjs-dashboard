'use client'
import { useEffect } from "react";

export default function Error({
    error,
    reset
}:{
    error: Error & {digest:string},
    reset: ()=>void
}){
    useEffect(()=>{
        console.error("in error page : ", error);
    }, [error]);

    return (
        <main className="flex h-full flex-col item-center justify-center">
            <h2 className="text-center">Something went wrong!!</h2>
            <button 
                // className="mt-4 rounded-md bg-blue-400 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                onClick={()=>reset()}
            >
                Try again
            </button>
        </main>
    )
}