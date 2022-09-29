import type { NextPage } from 'next'
import React, { useState } from 'react';

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import PageTitle from '../../components/Head/page-title';
import styled from 'styled-components';
import { Row, Col, Typography, Input, Button, notification } from 'antd';
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
  ButtonForgetPassword,
  FormError
} from '../../components/components';

import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
} from 'formik';
import Slides from '../../components/slides/Slides';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AuthLayout from '../../layouts/AuthLayout';
import * as Yup from 'yup'
import { creer_un_compte } from '../api/compte/compte-action';
import { statusCode } from '../../helpers/statusCode';


const { Title } = Typography

interface MyFormValues {
  firstName: string;
}

interface Values {
  password: string;
  email: string;
  confirmpassword: string;
}





const Register: NextPage = () => {
  const [chargement, setChargement] = useState(false);
  const router = useRouter();


  const handleSubmitLofin = (values: Values) => {
    setChargement(true)
    let data = {
      fullname: '',
      phone_number: '',
      password: values.password,
      email: values.email,
      confirmpassword: values.confirmpassword
    }

    creer_un_compte(data).then((res) => {
      if (res.status == statusCode.suucess) {
        notification.success({
          message: 'Succès',
          description: 'Opération effectuée avec succès !',
        });
        router.push('/')
      }
      else if (res.statusCode == statusCode.error) {
        setChargement(false)
        notification.error({
          message: 'Error',
          description: res.message,
          placement: 'bottomLeft'
        })
      }
    });

  }


  const handlePageConnexion = (): void => {
    router.push('/');
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Votre email est non valid')
      .required('Votre email est requis'),
    password: Yup.string().required('Votre mot de passe est requis'),
    confirmpassword: Yup.string()
      .required('Votre mot de passe est requis')
      .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas')
  })

  return (
    <React.Fragment>
      <AuthLayout title='Creer un compte' description='Creer un compte'>
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
                    <Title level={3}> Créer votre compte </Title>
                    <span>Entrer vos informations ci dessous</span>
                  </FormTitle>

                  <Section>
                    <Formik
                      initialValues={{
                        password: '',
                        email: '',
                        confirmpassword: ''
                      }}
                      onSubmit={(values: Values) => handleSubmitLofin(values)}
                      validationSchema={validationSchema}
                    >
                      {({ values, handleChange, handleSubmit, touched, errors }) => (
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
                              {touched.password && errors.password && <div>{errors.password}</div>}
                            </FormError>
                          </Col>

                          <Col span={24} style={{ marginTop: '1rem' }}>
                            <label htmlFor="firstName">Confirmer mot de passe</label>
                            <Field
                              as={PasswordItemField}
                              value={values.confirmpassword}
                              onChange={handleChange('confirmpassword')}
                              placeholder="Mot de passe"
                              type="text"
                            />
                            <FormError>
                              {touched.confirmpassword && errors.confirmpassword && <div>{errors.confirmpassword}</div>}
                            </FormError>
                          </Col>

                          <Col span={24}>
                            <ButtonLogin
                              loading={chargement}
                              disabled={chargement}
                              onClick={() => handleSubmit()}
                            >
                              Je confirme mes informations
                            </ButtonLogin>
                          </Col>

                          <Row justify='center' style={{ marginTop: '1rem' }}>
                            <div>
                              <span>Vous avez de compte ? </span>
                              {/* <a href='/'>Connecter-vous</a> */}
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

export default Register
