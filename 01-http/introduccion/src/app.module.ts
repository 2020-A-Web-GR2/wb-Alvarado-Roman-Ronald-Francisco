import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";

@Module({
  imports: [
      // Aqui otros modulos
      //HttpJuegoModule,
      UsuarioModule,
      TypeOrmModule.forRoot({
          name: 'default', //nombre conexion
          type: 'mysql', // mysql postgres
          host: 'localhost', // Ip del DB
          port: 3306, // puerto
          username: 'root', // Usuario
          password: 'root', // Password
          database: 'test', // Base de datos
          entities: [ // TODAS LAS ENTIDADES
              UsuarioEntity
          ],
          synchronize: true, // Actualiza el esquema de la base de datos
          dropSchema: false, //Eliminar Datos y el Esquema de base de datos
      }),

  ],
  controllers: [
      // Controlodarores APP mODULE
      AppController
  ],
  providers: [
      // Servicios APP MODULE
      AppService],
})
export class AppModule {}
