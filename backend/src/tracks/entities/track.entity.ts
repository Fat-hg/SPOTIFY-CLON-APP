import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Album } from '../../albumes/entities/album.entity';

@Entity('tracks')
export class Track {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 150 })
    title: string;

    @Column({ type: 'int' })
    duration_seconds: number;

    @Column({ type: 'uuid' })
    album_id: string;

    @ManyToOne(() => Album, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'album_id' })
    album: Album;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;
}
