import { CREER_UN_COMPTE_URL } from './../services/ApiRouter';
import api from "../services/api"


// CREER UN COMPTE
interface Icreer_un_compte {
    fullname: string;
    phone_number: string;
    password: string;
    email: string;
    confirmpassword: string;
}
export const creer_un_compte = async (data: Icreer_un_compte) => {
    return api.post(CREER_UN_COMPTE_URL, data).then((res) => res).catch((err) => err?.response?.data);
}