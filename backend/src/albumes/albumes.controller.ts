import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlbumesService } from './albumes.service';
import { CreateAlbumeDto } from './dto/create-albume.dto';
import { UpdateAlbumeDto } from './dto/update-albume.dto';

@Controller('albumes')
export class AlbumesController {
  constructor(private readonly albumesService: AlbumesService) { }

  @Post()
  create(@Body() createAlbumeDto: CreateAlbumeDto) {
    return this.albumesService.create(createAlbumeDto);
  }

  @Get()
  findAll() {
    return this.albumesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albumesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlbumeDto: UpdateAlbumeDto) {
    return this.albumesService.update(id, updateAlbumeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumesService.remove(id);
  }
}
