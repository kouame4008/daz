import * as React from 'react';
import {
    Formik,
    Form,
    Field,
} from 'formik';
import * as Yup from 'yup';
import { Button, Row, Col, Radio, Select, Space, notification } from 'antd';
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
import { IcompagnieFormProps } from '../../pages/api/services/interfaces';
import usePays from '../../pages/api/pays/use-pays';
import { useAuth } from '../../pages/api/auth/auth-actions';
import { creer_compagnie } from '../../pages/api/compagnie/compagnie-actions';
import { statusCode } from '../../helpers/statusCode';


interface compagniePropsType {
    handleNextSteep: Function
}



const { Option } = Select;



const Compagnie = ({ handleNextSteep }: compagniePropsType) => {

    const [chargement, setChargement] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const { pays, chargementPays, mutatePays } = usePays()
    const { user } = useAuth()

    const handleSubmitLofin = (values: Partial<IcompagnieFormProps>) => {
        setLoading(true)
        let data = {
            company_name: values.company_name,
            shipping: values.shippingInt == 1 ? 'OUI' : 'NON',
            country: values.country,
            user: typeof user !== "undefined" && user._doc._id
        }
        creer_compagnie(data).then((res) => {
            setLoading(false)
            if (res.status == statusCode.suucess) {
                notification.success({
                    message: 'Succès',
                    description: 'Opération effectuée avec succès !',
                });
                handleNextSteep()
            }
            else if ((statusCode.error).includes(res.statusCode)) {
                notification.error({
                    message: 'Error',
                    description: res.message,
                    placement: 'bottomLeft'
                })
            }
        })
    }
    const handleSubmit = () => { }

    const validationSchema = Yup.object().shape({
        company_name: Yup.string().required('Le nom de la compagnie est obligatoire'),
        shippingInt: Yup.number().required('Champs obligatoire'),
        country: Yup.string().required('Champs obligatoire'),
    });

    return (
        <React.Fragment>
            <div>
                <Formik
                    initialValues={{
                        company_name: '',
                        shippingInt: 1,
                        country: [],
                    }}
                    onSubmit={(values: Partial<IcompagnieFormProps>) => handleSubmitLofin(values)}
                    validationSchema={validationSchema}
                >
                    {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
                        <Form>
                            <div className="current-steep-content">
                                <div className='row'>
                                    <div className='col-md-12' style={{ marginTop: '1rem' }}>
                                        <label htmlFor="firstName">Nom de la compagnie <sup>*</sup></label>
                                        <Field
                                            as={InputItemField}
                                            value={values.company_name}
                                            onChange={handleChange('company_name')}
                                            placeholder="Ex: Daz Trans Africa"
                                            type="text"
                                        />
                                        <FormError>
                                            {touched.company_name && errors.company_name && <div>{errors.company_name}</div>}
                                        </FormError>
                                    </div>

                                    <div className='col-md-12' style={{ marginTop: '1.5rem' }}>
                                        <label htmlFor="firstName">Faites-vous  l&apos;expédition de colis entre plusieurs pays ? <sup>*</sup>  </label>
                                        <div>
                                            <Radio.Group size='large' onChange={(e) => setFieldValue('shippingInt', parseInt(e.target.value))} value={values.shippingInt}>
                                                <Radio value={1}>OUI</Radio>
                                                <Radio value={2}>NON</Radio>
                                            </Radio.Group>
                                        </div>
                                        <FormError>
                                            {touched.shippingInt && errors.shippingInt && <div>{errors.shippingInt}</div>}
                                        </FormError>
                                    </div>

                                    <div className='col-md-12' style={{ marginTop: '1.5rem' }}>
                                        <label htmlFor="firstName">Entrer le(s) pays dans lequel (lesquels) vous êtes. <sup>*</sup> </label>
                                        <div className="row w-100">
                                            <Row gutter={16}>
                                                <Col span={24}>
                                                    <SelectItemField
                                                        allowClear
                                                        placeholder="Choisissez un pays"
                                                        mode={values.shippingInt == 1 ? "multiple" : undefined}
                                                        style={{ width: '100%' }}
                                                        filterOption={(inputValue, option) =>
                                                            typeof option !== 'undefined' &&
                                                            option.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
                                                        }
                                                        onChange={(value, option) => {
                                                            option !== null
                                                                ? setFieldValue('country', value)
                                                                : setFieldValue('country', null)
                                                        }}

                                                    >
                                                        {pays && pays.map((item: Partial<IcompagnieFormProps>) => (
                                                            <Option
                                                                key={item.id}
                                                                value={item.id}
                                                                name={item.country_name}
                                                            >
                                                                {item.country_name}
                                                            </Option>
                                                        ))}
                                                    </SelectItemField>
                                                </Col>
                                                {/* <Col span={3}>
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
                                                </Col> */}
                                            </Row>
                                        </div>
                                        <FormError>
                                            {touched.country && errors.country && <div>{errors.country}</div>}
                                        </FormError>
                                    </div>

                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <ButtonLogin
                                        onClick={() => handleSubmit()}
                                        loading={loading}
                                        disabled={loading}
                                        style={{
                                            fontSize: '1rem',
                                        }}
                                    >
                                        Valider et passer à la prochaine étape
                                    </ButtonLogin>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </React.Fragment>
    )
}

export default Compagnie;