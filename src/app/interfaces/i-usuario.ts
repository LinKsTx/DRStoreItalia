export interface IUsuario {
    id?: number
    nick: string,
    nombre: string,
    correo: string,
    domicilio?: string,
    contrasenya: string,
    //? = optativa, no da error si no la pones
    contrasenya2?: string,
    pic?: string;
    tipo?: number
}
