import api from "../services/api"


export const liste_pays = async (url: string) => {
    return api.get(url).then((res) => res.data)
}