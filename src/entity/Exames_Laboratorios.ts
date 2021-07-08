import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm"

@Entity()
export class Exames_Laboratorios {
    @ObjectIdColumn()
    id: ObjectID

    @Column({ length: 70 })
    exameId: string

    @Column({ length: 70 })
    laboratorioId: string
}
