import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    Param,
    Post,
    Query,
    Req, Res
} from "@nestjs/common";
import {MascotaCeateDto} from "./dto/mascota.create-dto";
import {validate, ValidationError} from "class-validator";
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
    @Get('parametros-consulta')
    parametrosConsulta(
        @Query() parametrosDeConsulta
    ){
        const nombre = parametrosDeConsulta.nombre;
        const apellido = parametrosDeConsulta.apellido;
        console.log('parametrosDeConsulta', parametrosDeConsulta);
        if(nombre && apellido){
            return nombre+' '+apellido;
        }else{
            throw new BadRequestException('= )');
        }

    }

    @Post('parametros-cuerpo')
    async parametrosCuerpo(
        @Body() parametrosDeCuerpo
    ){
        //Promesas
        const mascotaValida = new MascotaCeateDto();
        mascotaValida.casada = parametrosDeCuerpo.casada;
        mascotaValida.edad = parametrosDeCuerpo.edad;
        mascotaValida.ligada = parametrosDeCuerpo.ligada;
        mascotaValida.nombre = parametrosDeCuerpo.nombre;
        mascotaValida.peso = parametrosDeCuerpo.peso;

        try {
            const errores:ValidationError[] = await validate(mascotaValida)
            if (errores.length > 0){
                console.error('Errores: ', errores);
                throw new BadRequestException('Error validando')
            }else{
                return {
                    mensaje: 'Se creo correctamente'
                };
            }
        }catch (e) {
            console.error('Error ',e)
            throw new BadRequestException('Error validando')
        }

        console.log('parametrosDeCuerpo', parametrosDeCuerpo);
        return 'Resgistro Creado';
    }

    @Get('guardarCookieInsegura')
    guardarCookieInsegura(
        @Query() parametrosConsulta,
        @Req() req,
        @Res() res,
    ){
        res.cookie(
            'galetaInsegura', //nombre
            'Tengohambre',
        );
        const mensaje = {
            mensaje: 'ok'
        };
        // retun mensaje; // NO SE [UEDE USAR RETURN CUANDO SE USA @RES() JO !!
        res.send(mensaje); // METODO EXPRESSJS
    }

    // 1 Guardar Cookie Insegura
    // 2 Guardar Cookie Segura
    // 3 Mostrar Cookies
}