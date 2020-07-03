import {BadRequestException, Controller, Delete, Get, Header, HttpCode, Param, Post} from "@nestjs/common";
// /juegos-http
// @Controller('juegos-http')
@Controller('juegos-http') export class HttpJuegoController {
    @Get('hola')
    @HttpCode(201)
    holaGet(){
        throw new BadRequestException('No envia nada')
        //return 'Hola GET! :)';
    }
    @Post('hola')
    @HttpCode(202)
    holaPost(){
        return 'Hola POST! :)';
    }

    @Delete('hola')
    @HttpCode(204)
    @Header('Cache-control','none')
    @Header('EPN','probando las cosas')
    holaDelete(){
        return 'Hola DELETE! :)';
    }

    // http://localhost:3001/juegos-http/parametros-ruta/XXgestion/YY
    @Get('/parametros-ruta/:edad/gestion/:altura')
    parametrosRutaEjemplo(
        @Param() parametrosRuta
    ){
        console.log('Parametros', parametrosRuta);
        //isNaN() // 'ABC' true
        const edad = Number(parametrosRuta.edad);
        const altura = Number(parametrosRuta.altura);
        if(isNaN(edad) && isNaN(altura)){
            throw new BadRequestException('No son numeros');
        }else{
            return edad + altura;
        }
    }
}