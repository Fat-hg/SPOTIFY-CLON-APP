import { Injectable } from '@nestjs/common';
import { CreateAlbumeDto } from './dto/create-albume.dto';
import { UpdateAlbumeDto } from './dto/update-albume.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumesService {
  constructor(
    @InjectRepository(Album)
    private albumesRepository: Repository<Album>,
  ) { }

  create(createAlbumeDto: CreateAlbumeDto) {
    const album = this.albumesRepository.create(createAlbumeDto);
    return this.albumesRepository.save(album);
  }

  findAll() {
    return this.albumesRepository.find({ relations: ['artist'] });
  }

  findOne(id: string) {
    return this.albumesRepository.findOne({ where: { id }, relations: ['artist'] });
  }

  async update(id: string, updateAlbumeDto: UpdateAlbumeDto) {
    await this.albumesRepository.update(id, updateAlbumeDto);
    return this.findOne(id);
  }

  remove(id: string) {
    return this.albumesRepository.delete(id);
  }
}
