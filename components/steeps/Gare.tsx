import * as React from 'react';
import {
    Formik,
    Form,
    Field,
} from 'formik';
import * as Yup from 'yup';
import { Button, Row, Col, Select, message, Upload, Radio } from 'antd';
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
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';


interface userPropsType {
    handleNextSteep: Function
}

interface FormProps {
    nom_gare: string;
    pays: string;
    ville: string;
    agent: string;
    fonction: number;
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


const Gare = ({ handleNextSteep }: userPropsType) => {

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
                        nom_gare: '',
                        pays: '',
                        ville: '',
                        agent: '',
                        fonction: 1,
                    }}
                    onSubmit={(values: FormProps) => handleNextSteep(values)}
                // validationSchema={validationSchema}
                >
                    {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
                        <Form>
                            <div className="current-steep-content">
                                <Row gutter={16}>
                                    <Col span={24} style={{ marginTop: '1rem' }}>
                                        <label htmlFor="firstName">Nom de la gare <sup>*</sup></label>
                                        <Field
                                            as={InputItemField}
                                            value={values.nom_gare}
                                            onChange={handleChange('nom_gare')}
                                            placeholder="Ex: Daz Trans Africa"
                                            type="text"
                                        />
                                        <FormError>
                                            {touched.nom_gare && errors.nom_gare && <div>{errors.nom_gare}</div>}
                                        </FormError>
                                    </Col>

                                    <Col span={12} style={{ marginTop: '1rem' }}>
                                        <label htmlFor="firstName">Pays <sup>*</sup></label>
                                        <SelectItemField
                                            placeholder="Choisir un pays"
                                        >
                                        </SelectItemField>
                                        <FormError>
                                            {touched.pays && errors.pays && <div>{errors.pays}</div>}
                                        </FormError>
                                    </Col>

                                    <Col span={12} style={{ marginTop: '1rem' }}>
                                        <label htmlFor="firstName">Ville <sup>*</sup></label>
                                        <SelectItemField
                                            placeholder="Choisir une ville"
                                        >
                                        </SelectItemField>
                                        <FormError>
                                            {touched.ville && errors.ville && <div>{errors.ville}</div>}
                                        </FormError>
                                    </Col>

                                    <Col span={9} style={{ marginTop: '1rem' }}>
                                        <label htmlFor="firstName">Agent <sup>*</sup></label>
                                        <div className="container-fluid">
                                            <div className="row">
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
                                                <div className="col-md-10">
                                                    <SelectItemField
                                                        placeholder="Choisir un utilisateur"
                                                    >
                                                    </SelectItemField>
                                                </div>
                                            </div>
                                        </div>
                                        <FormError>
                                            {touched.agent && errors.agent && <div>{errors.agent}</div>}
                                        </FormError>
                                    </Col>

                                    <Col span={12} style={{ marginTop: '1.5rem' }}>
                                        <label htmlFor="firstName">Fonction <sup>*</sup>  </label>
                                        <div>
                                            <Radio.Group size='large' onChange={(e) => setFieldValue('expedition', parseInt(e.target.value))} value={values.fonction}>
                                                <Radio value={1}>Responsable colis</Radio>
                                                <Radio value={2}>Responsable colis adjoint</Radio>
                                            </Radio.Group>
                                        </div>
                                        <FormError>
                                            {touched.fonction && errors.fonction && <div>{errors.fonction}</div>}
                                        </FormError>
                                    </Col>
                                </Row>
                            </div>
                            <Row>
                                <Col span={24}>
                                    <ButtonAjouter>
                                        Ajouter une Gare
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

export default Gare;