import { Injectable } from '@nestjs/common';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artista } from './entities/artista.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistasService {
  constructor(
    @InjectRepository(Artista)
    private artistasRepository: Repository<Artista>,
  ) { }

  create(createArtistaDto: CreateArtistaDto) {
    const artista = this.artistasRepository.create(createArtistaDto);
    return this.artistasRepository.save(artista);
  }

  findAll() {
    return this.artistasRepository.find();
  }

  findOne(id: string) {
    return this.artistasRepository.findOneBy({ id });
  }

  async update(id: string, updateArtistaDto: UpdateArtistaDto) {
    await this.artistasRepository.update(id, updateArtistaDto);
    return this.findOne(id);
  }

  remove(id: string) {
    return this.artistasRepository.delete(id);
  }
}
