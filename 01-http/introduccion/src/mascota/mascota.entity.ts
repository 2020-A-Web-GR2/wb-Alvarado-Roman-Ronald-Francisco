import {Entity, ManyToOne, OneToMany} from 'typeorm';
import {Column, PrimaryGeneratedColumn} from "typeorm/index";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {VacunaEntity} from "../vacuna/vacuna.entity";

@Entity()
export class MascotaEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(
        type =>
            UsuarioEntity,
        usuario => usuario.mascotas
        //Campo con el que relacionamos
    )
    usuario: UsuarioEntity;

    @OneToMany(
        type => VacunaEntity, //Que entidad nos relacionamos
        vacuna => vacuna.mascota
        // Campo con el que relacionamos
    )
    vacunas: VacunaEntity[];

}