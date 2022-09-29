import type { NextPage } from 'next'
import React from 'react';

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import PageTitle from '../../components/Head/page-title';
import styled from 'styled-components';
import { Row, Col, Typography, Input, Button } from 'antd';
import LogoDaz from '../../public/assets/logo.jpg';
import {
    PasswordItemField,
    InputItemField,
    ButtonLogin,
    WrapperContent,
    Wrapper,
    WrapperContentImage,
    Logo,
    FormLogin,
    FormLoginContent,
    FormTitle,
    Section,
    ButtonForgetPassword
} from '../../components/components';

import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
} from 'formik';
import Slides from '../../components/slides/Slides';
import { useRouter } from 'next/router';
import AuthLayout from '../../layouts/AuthLayout';



const { Title } = Typography


interface MyFormValues {
    firstName: string;
}

interface Values {
    password: string;
    email: string;
}





const MotDePasseOublie: NextPage = () => {
    const router = useRouter();
    const [chargement, setChargement] = React.useState(false);

    const handleSubmitLofin = (values: Values) => {
    setChargement (true)
        setTimeout(() => {
            setChargement(false);
            router.push('/dashboard')
        }, 3000)
    }

    const handlePageConnexion = (): void => {
        router.push('/');
    }

    return (
        <React.Fragment>
            <AuthLayout title='Mot de passe oublié' description='Mot de passe oublié'>
                <Row style={{ height: '100vh' }}>
                    <Col md={12} sm={24}>
                        <Wrapper>
                            <Logo className='m-3'>
                                <Image
                                    src={LogoDaz.src}
                                    width={"50"}
                                    height={"50"}
                                    alt={"Logo"}
                                />
                            </Logo>
                            <FormLogin>
                                <FormLoginContent>
                                    <FormTitle style={{ textAlign: 'center' }}>
                                        <Title level={3}> Mot de passe oublié </Title>
                                        <span>Entrer votre email pour recevoir un lien de modification</span>
                                    </FormTitle>

                                    <Section>
                                        <Formik
                                            initialValues={{
                                                password: '',
                                                email: '',
                                                c_password: ''
                                            }}
                                            onSubmit={(values: Values) => handleSubmitLofin(values)}
                                        >
                                            {({ values, handleChange, handleSubmit }) => (
                                                <Form>
                                                    <Col span={24} style={{ marginTop: '1rem' }}>
                                                        <label htmlFor="firstName">Email</label>
                                                        <Field
                                                            as={InputItemField}
                                                            value={values.email}
                                                            onChange={handleChange('email')}
                                                            placeholder="Entrer votre adresse email"
                                                            type="text"
                                                        />
                                                    </Col>

                                                    <Col span={24}>
                                                        <ButtonLogin
                                                            loading={chargement}
                                                            disabled={chargement}
                                                            onClick={() => handleSubmit()}
                                                        >
                                                            Je confirme que c est bien mon mail
                                                        </ButtonLogin>
                                                    </Col>

                                                    <Row justify='center' style={{ marginTop: '1rem' }}>
                                                        <div>
                                                            <span>Vous avez déjà un compte ? </span>
                                                            <ButtonForgetPassword type={"link"} onClick={() => handlePageConnexion()}> Connecter-vous </ButtonForgetPassword>
                                                        </div>
                                                    </Row>
                                                </Form>
                                            )}
                                        </Formik>
                                    </Section>
                                </FormLoginContent>
                            </FormLogin>
                        </Wrapper>
                    </Col>
                    <Col md={12} sm={24}>
                        <WrapperContentImage>
                            <Slides />
                        </WrapperContentImage>
                    </Col>
                </Row>
            </AuthLayout>
        </React.Fragment>
    )
}

export default MotDePasseOublie
