import type { GetStaticProps, NextPage, NextPageContext } from 'next'
import React, { useContext, useState } from 'react';

import Image from 'next/image'

import { Row, Col, Typography, Input, Button, notification } from 'antd';
import LogoDaz from '../public/assets/logo.jpg';
import * as Yup from 'yup'

import {
  Formik,
  Form,
  Field,
} from 'formik';
import Slides from '../components/slides/Slides';
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
  ButtonForgetPassword,
  FormError
} from '../components/components';
import Router, { useRouter } from 'next/router';
import AuthLayout from '../layouts/AuthLayout';
import { useAuth } from './api/auth/auth-actions';
// import { handleLogin, loginUser } from './api/auth/auth-actions';


const { Title } = Typography


interface MyFormValues {
  firstName: string;
}

interface Values {
  password: string;
  email: string;
}

interface TpePropsPosts {
  userId: number;
  id: number;
  title: string;
  body: string;
}


interface propsLoginPage {
  allPostsData?: TpePropsPosts[]
}

interface AppContextInterface {
  isAuthenticated: boolean;
  user: Object | null;
  login: Function;
  logout: Function;
  loading: boolean
}



const Login: NextPage = ({ allPostsData }: propsLoginPage) => {
  const [chargement, setChargement] = useState(false);
  const router = useRouter();
  const { isAuthenticated, loading, login, logout, user } = useAuth()

  // Soummision du formulaire de connexion
  const handleSubmitLofin = async (values: Values) => {
    setChargement(true);
    let data = {
      username: values.email,
      password: values.password
    }

    // Connexion de l'utilisateur email/password
    login(values.email, values.password).then((res: { status: string; error: any }) => {
      if (res.status === "succes") {
        router.push('/dashboard');
      }
      else {
        console.log (res)
        setChargement(false)
        notification.error({
          message: res.status,
          description: res && res.error.message,
          placement: 'bottomLeft'
        })
      }
    });
  }

  const handlePageCreerCompte = () => {
    router.push('/compte/creer-un-compte')
  }

  const handlePageMotDePasseOublie = () => {
    router.push('/compte/mot-de-passe-oublie')
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Votre email est non valid')
      .required('Votre email est requis'),
    password: Yup.string().required('Votre mot de passe est requis')
  })

  return (
    <React.Fragment>
      <AuthLayout title='Auth' description='Auth'>
        <Row style={{ height: '100vh' }}>
          <Col md={12} sm={24}>
            <Wrapper>
              <Logo className='m-3'>
                {/* <img src={LogoDaz.src} alt="" style={{ height: '50px' }} /> */}
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
                    <Title level={3}> Bon retour </Title>
                    <span>Entrer vos informations ci dessous</span>
                  </FormTitle>

                  <Section>
                    <Formik
                      initialValues={{
                        password: '',
                        email: '',
                      }}
                      onSubmit={(values: Values) => handleSubmitLofin(values)}
                      validationSchema={validationSchema}
                    >
                      {({ values, handleChange, handleSubmit, errors, touched }) => (
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
                            <FormError>
                              {touched.email && errors.email && <div>{errors.email}</div>}
                            </FormError>
                          </Col>

                          <Col span={24} style={{ marginTop: '1rem' }}>
                            <label htmlFor="firstName">Mot de passe</label>
                            <Field
                              as={PasswordItemField}
                              value={values.password}
                              onChange={handleChange('password')}
                              placeholder="Mot de passe"
                              type="text"
                            />
                            <FormError>
                              {touched.email && errors.password && <div>{errors.password}</div>}
                            </FormError>
                          </Col>

                          <Col span={24}>
                            <ButtonForgetPassword
                              type={'link'}
                              onClick={() => handlePageMotDePasseOublie()}
                            >
                              Mot de passe oublié
                            </ButtonForgetPassword>
                          </Col>

                          <Col span={24}>
                            <ButtonLogin
                              onClick={() => handleSubmit()}
                              loading={chargement}
                              disabled={chargement}
                            >
                              Se connecter
                            </ButtonLogin>
                          </Col>

                          <Row justify='center' style={{ marginTop: '1rem' }}>
                            <div>
                              <span>Vous n avez pas de compte ? </span>
                              <ButtonForgetPassword type={"link"} onClick={() => handlePageCreerCompte()}> Inscrivez-vous </ButtonForgetPassword>
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


export default Login;