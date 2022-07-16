import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// "ts": "2022-07-12T15:00:00.000Z",
// "aqius": 34,
// "mainus": "p2",
// "aqicn": 12,
// "maincn": "p2"
@Entity()
export class Info {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    dateTime: string;

    @Column()
    ts: string;

    @Column()
    aqius: number;

    @Column()
    mainus: string;

    @Column()
    aqicn: number;

    @Column()
    maincn: string;
}