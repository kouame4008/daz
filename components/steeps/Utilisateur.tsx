import * as React from 'react';
import {
    Formik,
    Form,
    Field,
} from 'formik';
import * as Yup from 'yup';
import { Button, Row, Col, Select, message, Upload } from 'antd';
import {
    PasswordItemField,
    InputItemField,
    ButtonLogin,
    ButtonForgetPassword,
    FormError,
    SelectItemField,
    ButtonAdd,
    ButtonAjouter
} from '../../components/components';
import { InboxOutlined  } from '@ant-design/icons';
import type { UploadProps } from 'antd';


interface userPropsType {
    handleNextSteep: Function
}

interface FormProps {
    password_user: string;
    c_password_user: string;
    nom_user: string;
    login_user: string;
}

const { Dragger } = Upload;


const { Option } = Select;

const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};


const Utilisateur = ({ handleNextSteep }: userPropsType) => {

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
                        password_user: '',
                        c_password_user: '',
                        nom_user: '',
                        login_user: ''
                    }}
                    onSubmit={(values: FormProps) => handleNextSteep(values)}
                // validationSchema={validationSchema}
                >
                    {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
                        <Form>
                            <div className="current-steep-content">
                                <Row gutter={16}>
                                    <Col span={12} style={{ marginTop: '1rem' }}>
                                        <label htmlFor="firstName">Nom <sup>*</sup></label>
                                        <Field
                                            as={InputItemField}
                                            value={values.nom_user}
                                            onChange={handleChange('nom_user')}
                                            placeholder="Nom de famille"
                                            type="text"
                                        />
                                        <FormError>
                                            {touched.nom_user && errors.nom_user && <div>{errors.nom_user}</div>}
                                        </FormError>
                                    </Col>

                                    <Col span={12} style={{ marginTop: '1rem' }}>
                                        <label htmlFor="firstName">Login <sup>*</sup></label>
                                        <Field
                                            as={InputItemField}
                                            value={values.login_user}
                                            onChange={handleChange('login_user')}
                                            placeholder="Entrer un identifiant"
                                            type="text"
                                        />
                                        <FormError>
                                            {touched.login_user && errors.login_user && <div>{errors.login_user}</div>}
                                        </FormError>
                                    </Col>

                                    <Col span={12} style={{ marginTop: '1rem' }}>
                                        <label htmlFor="firstName">Mot de passe <sup>*</sup></label>
                                        <Field
                                            as={PasswordItemField}
                                            value={values.password_user}
                                            onChange={handleChange('password_user')}
                                            placeholder="*****************"
                                            type="text"
                                        />
                                        <FormError>
                                            {touched.password_user && errors.password_user && <div>{errors.password_user}</div>}
                                        </FormError>
                                    </Col>

                                    <Col span={12} style={{ marginTop: '1rem' }}>
                                        <label htmlFor="firstName">Confirmer mot de passe <sup>*</sup></label>
                                        <Field
                                            as={PasswordItemField}
                                            value={values.c_password_user}
                                            onChange={handleChange('c_password_user')}
                                            placeholder="*****************"
                                            type="text"
                                        />
                                        <FormError>
                                            {touched.c_password_user && errors.c_password_user && <div>{errors.c_password_user}</div>}
                                        </FormError>
                                    </Col>
                                </Row>
                            </div>
                          
                            <Row>
                                <Col span={24}>
                                    <ButtonAjouter>
                                        Ajouter un utilisateur
                                    </ButtonAjouter>
                                </Col>
                            </Row>
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
                                        Valider et passer à la prochaine étape
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

export default Utilisateur;