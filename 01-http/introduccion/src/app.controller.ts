import {Body, Controller, Get, Post, Req, Res, Session} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('login')
  login(
      @Res() res
  ){
    return res.render('login/login');
  }

  @Post('login')
  loginPost(
      @Body() parametrosCuerpo,
      @Res() res,
      @Session() session
  ){
    // Validamos los datos
    const usuario = parametrosCuerpo.usuario;
    const password = parametrosCuerpo.password;
    if(usuario === 'ronald' && password === '1234'){
      session.usuario = usuario;
      session.roles = ['Administrador'];
      return res.redirect('protegido');
    }else{
      if(usuario === 'franciso' && password === '9876'){
        session.usuario = usuario;
        session.roles = ['Supervisor'];
        return res.redirect('protegido');
      }else{
        return res.redirect('/login');
      }
    }
  }

  @Get('protegido')
  protegido(
      @Res() res,
      @Session() session
  ){
    const estaLogeado = session.usuario;
    if(estaLogeado){
      return res.render(
          'login/protegido',
          {
            usuario: session.usuario,
            roles: session.roles
          }
      )
    }else{
      return res.redirect('/login');
    }
  }

  @Get('logout')
  logout(
      @Session() session,
      @Res() res,
      @Req() req
  ){
    session.username = undefined;
    session.roles = undefined;
    req.session.destroy();
    return res.redirect('login')
  }


}
