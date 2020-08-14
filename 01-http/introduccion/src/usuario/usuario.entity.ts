import {OneToMany, Column, Index, Entity, PrimaryGeneratedColumn} from "typeorm";
import {MascotaEntity} from "../mascota/mascota.entity";

@Index([
    'nombre',
    'apellido',
    'cedula',
    'fechaNacimiento',
    'fechaHoraNacimiento' //
])
/*@Index(
    ['nombre', 'apellido', 'cedula'],
    {unique: true}
)*/

@Entity('epn_usuario') // NOMBRE DE LA TABLA DE USUARIO
export class UsuarioEntity {
    @PrimaryGeneratedColumn({
       unsigned: true,
       comment: 'Identificador',
        name: 'id'
    })
    id: number

    @Column({
        name: 'nombre',
        type: 'varchar',
        nullable: true,
        length: ' 60'
    })
    nombre?: string

    @Column({
        name: 'apellido',
        type: 'varchar',
        nullable: true,
        length: ' 60'
    })
    apellido?: string

    @Column({
        name: 'cedula',
        type: 'varchar',
        nullable: false,
        unique: true,
        length: '10'
    })
    cedula: string

    @Column({
        name: 'sueldo',
        nullable: true,
        type: 'decimal',
        precision:10, //10000000000.
        scale: 4,// .0001
    })
    sueldo?:number;

    @Column({
        nullable: true,
        type: 'date',
        name: 'fecha_nacimiento'
    })
    fechaNacimiento?:string;

    @Column({
        nullable: true,
        type: 'datetime',
        name: 'fecha_hora_nacimiento'
    })
    fechaHoraNacimiento?:string;

    @OneToMany(
        type => MascotaEntity, //Que entidad nos relacionamos
        mascota => mascota.usuario
        // Campo con el que relacionamos
    )
    mascotas: MascotaEntity[];
}