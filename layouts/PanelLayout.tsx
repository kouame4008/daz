import React, { ReactNode } from 'react'
import { NextSeo } from 'next-seo'
import { motion } from 'framer-motion'
import { useAuth, ProtectRoute } from '../pages/api/auth/auth-actions'
import { GetStaticProps } from 'next'
import PanelHeader from '../components/header/PanelHeader'

type Props = {
    children: ReactNode
    title: string
    description: string
}

interface AppContextInterface {
    isAuthenticated: boolean;
    user: Object | null;
    login: Function;
    logout: Function;
    loading: boolean
}

const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
}

const PanelLayout = ({ children, title, description }: Props): JSX.Element => {

    return (
        <ProtectRoute>
            <div>
                <NextSeo title={title} description={description} openGraph={{ title, description }} />
                <motion.main
                    initial="hidden"
                    animate="enter"
                    exit="exit"
                    variants={variants}
                    transition={{ type: 'linear' }}
                    className="
                    flex flex-col items-start w-full pt-10
                    px-8 sm:px-16 md:px-36 lg:px-52 xl:px-80 2xl:px-96
                    pt-24 h-full
                "
                >
                    <PanelHeader />
                    <section>
                        {children}
                    </section>
                </motion.main>
            </div>
        </ProtectRoute>
    )
}

export default PanelLayout;