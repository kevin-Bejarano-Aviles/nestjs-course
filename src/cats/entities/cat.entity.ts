import { Breed } from "src/breeds/entities/breed.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cat {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @DeleteDateColumn()
    deleteAt: Date;

    @ManyToOne( ()=> Breed, (breed)=> breed.id ,{
        eager:true //para que traiga la raza cuando hagamos un find one 
    })
    breed_id: Breed;

}
