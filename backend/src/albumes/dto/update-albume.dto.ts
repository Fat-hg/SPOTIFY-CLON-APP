import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumeDto } from './create-albume.dto';

export class UpdateAlbumeDto extends PartialType(CreateAlbumeDto) {}
