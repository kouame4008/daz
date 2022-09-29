import * as React from 'react';
import {
    Formik,
    Form,
    Field,
} from 'formik';
import * as Yup from 'yup';
import { Button, Row, Col, Radio, Select } from 'antd';
import {
    PasswordItemField,
    InputItemField,
    ButtonLogin,
    ButtonForgetPassword,
    FormError,
    SelectItemField,
    ButtonAdd
} from '../../components/components';
import { PlusOutlined } from '@ant-design/icons';


interface PropsType {
    handleNextSteep: Function
}

interface FormProps {
    matricule: string;
}


const { Option } = Select;


const Engin = ({ handleNextSteep }: PropsType) => {

    const [chargement, setChargement] = React.useState()

    const handleSubmitLofin = (values: FormProps) => { }
    const handleSubmit = () => { }

    const validationSchema = Yup.object().shape({
        nom_compagnie: Yup.string()
            .required('Votre email est requis'),
        password: Yup.string().required('Votre mot de passe est requis')
    })

    return (
        <React.Fragment>
            <div>
                <Formik
                    initialValues={{
                        matricule: '',
                    }}
                    onSubmit={(values: FormProps) => handleNextSteep(values)}
                // validationSchema={validationSchema}
                >
                    {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
                        <Form>
                            <div className="current-steep-content" style={{ height: "250px" }}>
                                <Row gutter={16}>
                                    <Col span={24} style={{ marginTop: '1.5rem' }}>
                                        <label htmlFor="firstName">Immatriculation. <sup>*</sup> </label>
                                        <div className="row w-100">
                                            <div className="col-md-11">
                                                <SelectItemField
                                                    placeholder="Ex: 123456789"
                                                >
                                                </SelectItemField>
                                            </div>
                                            <div className="col-md-1">
                                                <div
                                                    className='w-100 h-100'
                                                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                                >
                                                    <ButtonAdd
                                                        shape='circle'
                                                    >
                                                        <PlusOutlined style={{ fontSize: '1rem', color: '#d9d9d9' }} />
                                                    </ButtonAdd>
                                                </div>
                                            </div>
                                        </div>
                                        <FormError>
                                            {touched.matricule && errors.matricule && <div>{errors.matricule}</div>}
                                        </FormError>
                                    </Col>

                                </Row>
                            </div>
                            <Row>
                                <Col span={24}>
                                    <ButtonLogin
                                        onClick={() => handleSubmit()}
                                        loading={chargement}
                                        disabled={chargement}
                                        style={{
                                            fontSize: '1rem',
                                        }}
                                    >
                                        Valider et accéder au dashboard
                                    </ButtonLogin>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </div>
        </React.Fragment>
    )
}

export default Engin;