import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {UsuarioModule} from "./usuario/usuario.module";

@Module({
  imports: [
      // Aqui otros modulos
      //HttpJuegoModule,
      UsuarioModule

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
