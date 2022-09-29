import { LISTE_PAYS_URL } from './../services/ApiRouter';
import useSWR from 'swr'
import { liste_pays } from './pays-actions';

export const usePays = () => {
    const { data, mutate } = useSWR(LISTE_PAYS_URL, liste_pays);

    // render data
    return {
        pays: data && data,
        chargementPays: !data,
        mutatePays: mutate
    }
}

export default usePays