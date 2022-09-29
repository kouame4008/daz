import { Input, Button, Select } from 'antd';
import styled from 'styled-components';

const { Password } = Input

export const Wrapper = styled.section`
  background: #FFF;
  height: 100%;
  display: flex;
  flex-direction : column;
`;

export const WrapperContent = styled.div`
  height: 100%;
  display: flex;
`;

export const WrapperContentImage = styled.div`
  height: 100vh;
  display: flex;
  background : #EEE;
`;

export const Logo = styled.div`
  display: flex;
  height: 50px;
`;

export const FormLogin = styled.div`
  display: flex;
  flex : 1;
  justify-content: center;
  align-items: center;
  padding : 4rem 5rem;
  

  @media (max-width: 400px) {
    padding : 0;
  }
`;

export const FormLoginContent = styled.div`
  width : 100%;
  height : 100%;
  background : #FFF;
`;

export const FormTitle = styled.div`
  span {
    position: relative;
    top: -0.5rem;
  }
`;

export const InputItemField = styled(Input)`
  height: 40px;
  border-radius : 10px;
  margin-top : 5px;
`

export const SelectItemField = styled(Select)`
  width : 100%;
  .ant-select-selector {
    border-radius : 10px !important;
    margin-top : 5px;
    width : 100%;
    height: 40px !important;
  }

`

export const PasswordItemField = styled(Password)`
  height: 40px;
  border-radius : 10px;
  margin-top : 5px;
`;

export const Section = styled.section`
  margin-top : 2.5rem;
  padding: 0 3rem;

  @media only screen and (max-width : 400px) {
    padding : 0 1rem;
  }
`;

export const ButtonForgetPassword = styled(Button)`
  padding: 4px 0;
  color : #098b05;
  font-weight: 600;
`;

export const ButtonLogin = styled(Button)`
  background : #098b05;
  font-weight: 600;
  color: #FFF;
  width : 100%;
  height: 40px;
  border-radius : 10px;
  margin-top : 1rem;
`;

export const FormError = styled.small`
  color : red;
`;

export const ButtonAdd = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

export const ButtonAjouter = styled(Button)`
  width: 100%;
  margin: 1rem 0;
  border: 2px dashed rgba(0,0,0,.1);
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  color: #A6A1A1;
  text-transform: uppercase;
  border-radius: 10px;
`