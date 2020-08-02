import {Controller, Get, Post, Body, Param, Put, Delete} from "@nestjs/common";

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

    @Get()
    mostrarTodos(){
        return this.arregloUsuarios;
    }

    @Post()
    crearUno(
        @Body() parametrosCuerpo
    ){
        const nuevoUsuario = {
            id: this.idActual + 1,
            nombre: parametrosCuerpo.nombre
        };
        this.arregloUsuarios.push(nuevoUsuario);
        this.idActual = this.idActual +1;
    }

    @Get(':id')
    verUno(
        @Param() parametrosRuta
    ){
        const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )
        return this.arregloUsuarios[indice];
    }

    @Put(':id')
    editarUno(
        @Param() paramentrosRuta,
        @Body() parametrosCuerpo
    ){
        const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number(paramentrosRuta.id)
        );
        this.arregloUsuarios[indice].nombre = parametrosCuerpo.nombre;
        return this.arregloUsuarios[indice];
    }

    @Delete(':id')
    eliminarUno(
        @Param() paramentrosRuta
    ){
        const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number(paramentrosRuta.id)
        );
        this.arregloUsuarios.splice(indice, 1);
        return this.arregloUsuarios[indice];
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