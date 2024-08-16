import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class User {

    @Column({primary:true, generated:true})
    id: number;

    @Column()
    name:string;

    @Column({ unique: true, nullable:false })
    email:string;

    @Column()
    password:string;

    @Column({ default: false })
    role:string;

    @DeleteDateColumn()
    deletedAt: Date;
}
