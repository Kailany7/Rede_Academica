import { api } from "./api";


export interface Usuario {
    _id: string;
    nome: string;
    curso: string;
    semestre: string;
    bio: string;
    avatarColor: string;
}


export async function listarUsuarios() {

    const response =
        await api.get<Usuario[]>("/usuarios");


    return response.data;

}