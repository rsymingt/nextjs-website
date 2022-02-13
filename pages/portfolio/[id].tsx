
import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";

import portfolioData from "../../data/portfolio";
import React from "react";

export default function PortfolioPage() {
    const router = useRouter()
    const { id } = router.query

    if(!id || parseInt(id.toString()) === NaN) {
        return(
            <h1>Invalid URL</h1>
        )
    }

    const project = portfolioData.projects[parseInt(id.toString())];

    return(
        <div className="flex flex-col min-h-screen h-full w-full bg-white font-sans">
            <Image
            className="w-full"
            src={project.banner}
            layout="responsive"
            />
            <div className="container px-8 mt-4 flex flex-col space-y-4">
                <h1 className="font-bold pb-6 border-b-1">{project.title}</h1>
                <project.description/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        </div>
    )
}