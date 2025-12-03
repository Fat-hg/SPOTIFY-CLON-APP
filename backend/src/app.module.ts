import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistasModule } from './artistas/artistas.module';
import { AlbumesModule } from './albumes/albumes.module';
import { TracksModule } from './tracks/tracks.module';
import { SpotifyService } from './spotify/spotify.service';
import { Artista } from './artistas/entities/artista.entity';
import { Album } from './albumes/entities/album.entity';
import { Track } from './tracks/entities/track.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'music_catalog',
      entities: [Artista, Album, Track],
      synchronize: true, // Set to false in production
    }),
    ArtistasModule,
    AlbumesModule,
    TracksModule,
  ],
  controllers: [AppController],
  providers: [AppService, SpotifyService],
})
export class AppModule { }
