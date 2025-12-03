import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Artista } from '../../artistas/entities/artista.entity';

@Entity('albumes')
export class Album {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 150 })
    title: string;

    @Column({ type: 'int', nullable: true })
    release_year: number;

    @Column({ type: 'uuid' })
    artist_id: string;

    @ManyToOne(() => Artista, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'artist_id' })
    artist: Artista;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;
}
