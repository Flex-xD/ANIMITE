import { Schema, model, Document } from 'mongoose';

interface IAnime extends Document {
    malId: number;
    title: string;
    titleJapanese?: string;
    type: 'TV' | 'Movie' | 'OVA' | 'Special' | 'ONA' | 'Music';
    episodes?: number;
    status: 'Finished Airing' | 'Currently Airing' | 'Not yet aired';
    airing: boolean;
    aired?: {
        from?: Date;
        to?: Date;
    };
    duration?: string;
    rating?: 'G' | 'PG' | 'PG-13' | 'R' | 'R+' | 'Rx';
    score?: number;
    synopsis?: string;
    genres: {
        malId: number;
        name: string;
    }[];
    studios: {
        malId: number;
        name: string;
    }[];
    source?: string;
    popularity?: number;
    rank?: number;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

const animeSchema = new Schema<IAnime>(
    {
        malId: {
            type: Number,
            required: [true, 'MAL ID is required'],
            unique: true,
        },
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        titleJapanese: {
            type: String,
            trim: true,
        },
        type: {
            type: String,
            enum: ['TV', 'Movie', 'OVA', 'Special', 'ONA', 'Music'],
            required: [true, 'Type is required'],
        },
        episodes: {
            type: Number,
            min: [0, 'Episodes cannot be negative'],
        },
        status: {
            type: String,
            enum: ['Finished Airing', 'Currently Airing', 'Not yet aired'],
            required: [true, 'Status is required'],
        },
        airing: {
            type: Boolean,
            required: [true, 'Airing status is required'],
        },
        aired: {
            from: {
                type: Date,
            },
            to: {
                type: Date,
            },
        },
        duration: {
            type: String,
            trim: true,
        },
        rating: {
            type: String,
            enum: ['G', 'PG', 'PG-13', 'R', 'R+', 'Rx'],
        },
        score: {
            type: Number,
            min: [0, 'Score cannot be negative'],
            max: [10, 'Score cannot exceed 10'],
        },
        synopsis: {
            type: String,
            trim: true,
        },
        genres: [{
            malId: {
                type: Number,
                required: true,
            },
            name: {
                type: String,
                required: true,
                trim: true,
            },
        }],
        studios: [{
            malId: {
                type: Number,
                required: true,
            },
            name: {
                type: String,
                required: true,
                trim: true,
            },
        }],
        source: {
            type: String,
            trim: true,
        },
        popularity: {
            type: Number,
            min: [0, 'Popularity cannot be negative'],
        },
        rank: {
            type: Number,
            min: [0, 'Rank cannot be negative'],
        },
        imageUrl: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Anime = model<IAnime>('Anime', animeSchema);
export default Anime;