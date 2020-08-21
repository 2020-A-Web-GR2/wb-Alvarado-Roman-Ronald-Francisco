import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    BadRequestException,
    InternalServerErrorException, NotFoundException, Res
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {MascotaService} from "../mascota/mascota.service";

@Controller('usuario')
export class UsuarioController {

    public arregloUsuarios = [
        {
            id: 1,
            nombre: "Ronald"
        },
        {
            id:2,
            nombre: "Juan"
        },
        {
            id:3,
            nombre: "Roger"
        }
    ]

    public idActual = 3;

    constructor(
        private readonly _usuarioService: UsuarioService,
        private readonly _mascotaService: MascotaService,
    ) {
    }

    @Get()
    async mostrarTodos(){
        try {
            const respuesta = await this._usuarioService.buscarTodos();
            return respuesta;
        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor',
            })
        }
        //return this.arregloUsuarios;
    }

    @Post()
    async crearUno(
        @Body() parametrosCuerpo
    ){
        let respuesta;
        try {
            //validacion del CREATE DTO

            respuesta = await this._usuarioService.crearUno(parametrosCuerpo);

        }catch (e) {
            console.error(e);
            throw new BadRequestException({
                mensaje: 'Error vaidando datos'
            })
        }
        if(respuesta){
            return respuesta;
        } else {
            throw new NotFoundException({
                mensaje:'No existen registros'
            })
        }

        // const nuevoUsuario = {
        //     id: this.idActual + 1,
        //     nombre: parametrosCuerpo.nombre
        // };
        // };
        // this.arregloUsuarios.push(nuevoUsuario);
        // this.idActual = this.idActual +1;
    }

    @Get(':id')
    async verUno(
        @Param() parametrosRuta
    ){
        try {
            const respuesta = await this._usuarioService.buscarUno(Number(parametrosRuta.id));
            return respuesta;
        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor',
            })
        }
        /*const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )
        return this.arregloUsuarios[indice];*/
    }

    @Put(':id')
    async editarUno(
        @Param() paramentrosRuta,
        @Body() parametrosCuerpo
    ){
        const id = Number(paramentrosRuta.id);
        const usuarioEditado = parametrosCuerpo;
        usuarioEditado.id = id;
        try {
            const respuesta = await this._usuarioService.editarUno(usuarioEditado);
            return respuesta;
        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor',
            })
        }


        /*const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number(paramentrosRuta.id)
        );
        this.arregloUsuarios[indice].nombre = parametrosCuerpo.nombre;
        return this.arregloUsuarios[indice];*/

    }

    @Delete(':id')
    async eliminarUno(
        @Param() paramentrosRuta
    ){
        const id = Number(paramentrosRuta.id);
        try {
            const respuesta = await this._usuarioService.eliminarUno(id);
            return {
                mensaje: 'Registro con id '+ id + ' eliminado'
            };
        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor',
            })
        }
        /*const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number(paramentrosRuta.id)
        );
        this.arregloUsuarios.splice(indice, 1);
        return this.arregloUsuarios[indice];*/
    }

    @Post('crearUsuarioYCrearMascota')
    async crearUsuarioYCrearMascota(
        @Body() parametrosCuerpo
    ){
        const usuario = parametrosCuerpo.usuario;
        const mascota = parametrosCuerpo.mascota;
        // Validad Usuario
        // Valorar Mascota
        // -> CREAMOS LOS DOS

        let usuarioCreado;
        try {
            usuarioCreado = await this._usuarioService.crearUno(usuario);
        }catch (e) {
            console.error(e);
            throw new InternalServerErrorException({
                mensaje: 'Error creando usuario',
            })
        }

        if (usuarioCreado){
            mascota.usuario = usuarioCreado.id;
            let mascotaCreada;
            try {
                mascotaCreada = await this._mascotaService.crearNuevaMascota(mascota);
            }catch (e) {
                console.error(e);
                throw new InternalServerErrorException({
                    mensaje: 'Error creando mascota',
                })
            }
            if (mascotaCreada){
                return{
                    mascota: mascotaCreada,
                    usuario: usuarioCreado
                }
            }else {
                throw new InternalServerErrorException({
                    mensaje: 'Error creando mascota'
                })
            }
        }else {
            throw new InternalServerErrorException({
                mensaje: 'Error creando mascota'
            })
        }

    }

    @Get('vista/usuario')
    vstaUsuario(
        @Res() res
    ){
        const nombreControlador = 'Ronald'
        res.render(
            'ejemplo', // Nombre de la vista(archivo)
            {
                nombre: nombreControlador,
            })
    }


    //XML <usuario><nombre>RONALD</nombre></usuario>
    //JSON {"nombre": "RONALD"}
    //RESTful -JSON
    // Ver Todos
    // Ver Uno
    // Crear Uno
    // Editar Uno
    // Eliminar Uno


}