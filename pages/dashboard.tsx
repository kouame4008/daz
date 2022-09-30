import type { GetServerSideProps, NextPage } from 'next'
import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Button, message, Steps, Row, Col, notification } from 'antd';
import styled from 'styled-components';
import Compagnie from '../components/steeps/Compagnie';
import Utilisateur from '../components/steeps/Utilisateur';
import Gare from '../components/steeps/Gare';
import Trajet from '../components/steeps/Trajet';
import Engin from '../components/steeps/Engin';
import { useAuth } from './api/auth/auth-actions';



const { Step } = Steps;


const SectionFlex = styled.section``;

const SectionFlexContent = styled.div``;

interface FormProps {
    password: string;
    email: string;
}

enum TypeSteepContent {
    COMPAGNIE = 'compagnie',
    UTILISATEUR = 'utilisateur',
    GARE = 'gare',
    TRAJET = 'trajet',
    ENGIN = 'engin'
}



const steps = [
    {
        title: 'COMPAGNIE',
        content: 'compagnie',
    },
    {
        title: 'UTILISATEUR',
        content: 'utilisateur',
    },
    {
        title: 'GARE',
        content: 'gare',
    },
    {
        title: 'TRAJET',
        content: 'trajet',
    },
    {
        title: 'ENGIN',
        content: 'engin',
    },
];


const Dashboard: NextPage = () => {
    const [current, setCurrent] = useState(0);
    const [chargement, setChargement] = useState(false)

    const next = () => {
        setCurrent(current + 1);
    };

    const endNext = () => {
        notification.success({
            message: 'Felicitation vous avez Validé toutes les étapes'
        })
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const setComponent = (curentSteep: string): React.ReactNode => {
        switch (curentSteep) {
            case TypeSteepContent.COMPAGNIE:
                return <Compagnie handleNextSteep={next} />
                break;
            case TypeSteepContent.UTILISATEUR:
                return <Utilisateur handleNextSteep={next} />
                break;
            case TypeSteepContent.GARE:
                return <Gare handleNextSteep={next} />
                break;
            case TypeSteepContent.TRAJET:
                return <Trajet handleNextSteep={next} />
                break;
            case TypeSteepContent.ENGIN:
                return <Engin handleNextSteep={endNext} />
                break;

            default:
                break;
        }
    }

    const handleSubmitLofin = (values: FormProps) => { }

    const onSteepChange = (value: number) => {
        console.log('onChange:', current);
        setCurrent(value);
    };

    return (
        <React.Fragment>
            <DashboardLayout title={"title"} description={"description"}>
                <section className='container-fluid'>
                    <SectionFlex className='row justify-content-center mt-5'>
                        <SectionFlexContent className='col-md-7'>
                            <Steps current={current} onChange={onSteepChange}>
                                {steps.map(item => (
                                    <Step key={item.title} title={item.title} />
                                ))}
                            </Steps>
                            <div className="steps-content">
                                {/* {steps[current].content} */}
                                {setComponent(steps[current].content)}
                            </div>
                        </SectionFlexContent>
                    </SectionFlex>
                </section>
            </DashboardLayout>
        </React.Fragment>
    )
}

export default Dashboard;
