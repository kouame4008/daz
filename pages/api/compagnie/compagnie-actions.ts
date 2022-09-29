import { CREER_COMPAGNIE_URL } from './../services/ApiRouter';
import api from "../services/api"
import { IcompagnieFormProps } from '../services/interfaces';


// CREER COMPAGNIE
export const creer_compagnie = async (data: Partial<IcompagnieFormProps>) => {
    return api.post(CREER_COMPAGNIE_URL, data).then((res) => res).catch((err) => err?.response?.data);
}