import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SpotifyService {
    private accessToken: string;
    private tokenExpiration: number;

    async getAccessToken(): Promise<string> {
        if (this.accessToken && Date.now() < this.tokenExpiration) {
            return this.accessToken;
        }

        const clientId = process.env.SPOTIFY_CLIENT_ID;
        const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
        const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

        try {
            const response = await axios.post(
                'https://accounts.spotify.com/api/token',
                'grant_type=client_credentials',
                {
                    headers: {
                        Authorization: `Basic ${auth}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                },
            );

            this.accessToken = response.data.access_token;
            this.tokenExpiration = Date.now() + response.data.expires_in * 1000;
            return this.accessToken;
        } catch (error) {
            console.error('Error fetching Spotify token:', error);
            throw new Error('Could not fetch Spotify token');
        }
    }

    async searchArtist(query: string) {
        const token = await this.getAccessToken();
        try {
            const response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=artist`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error searching artist:', error);
            throw error;
        }
    }
}
