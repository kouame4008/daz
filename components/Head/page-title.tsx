import Head from 'next/head';
import React from 'react';

interface propsTypes {
    title: React.ReactNode
}

const PageTitle = ({
    title
}: propsTypes) => {
    return (
        <Head>
            <title> {title} </title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}

export default PageTitle;