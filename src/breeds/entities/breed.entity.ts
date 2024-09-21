import { Cat } from "../../cats/entities/cat.entity";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Breed {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({length:500})
    name:string;

    @OneToMany(()=> Cat ,(cat)=> cat.breed)
    cats:Cat[]

    @DeleteDateColumn()
    deletedAt: Date;
}
