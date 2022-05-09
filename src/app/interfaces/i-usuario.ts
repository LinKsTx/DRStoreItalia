export interface IUsuario {
    nick: string,
    nombre: string,
    correo: string,
    contrasenya: string,
     //? = optativa, no da error si no la pones
    contrasenya2?: string,
    tipo?: number
}
