import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) { }

  create(createTrackDto: CreateTrackDto) {
    const track = this.tracksRepository.create(createTrackDto);
    return this.tracksRepository.save(track);
  }

  findAll() {
    return this.tracksRepository.find({ relations: ['album'] });
  }

  findOne(id: string) {
    return this.tracksRepository.findOne({ where: { id }, relations: ['album'] });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    await this.tracksRepository.update(id, updateTrackDto);
    return this.findOne(id);
  }

  remove(id: string) {
    return this.tracksRepository.delete(id);
  }
}
