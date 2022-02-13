
import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";

import React from "react";

import * as posts from '../../../posts/';

export default function PortfolioPage() {
    const router = useRouter()
    const { id } = router.query

    // if(!title || parseInt(id.toString()) === NaN) {
    //     return(
    //         <h1>Invalid URL</h1>
    //     )
    // }


    return(
        <div className="flex flex-col min-h-screen h-full w-full bg-white font-sans pb-10">
            {id}
        </div>
    )
}