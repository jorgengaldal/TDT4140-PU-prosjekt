export interface MovieSerializer {
    id?: string;
    title: string;
    created_at?: string | null;
    updated_at?: string;
    rated?: string | null;
    released?: string | null;
    runtime?: number | null;
    plot?: string | null;
    poster?: string | null;
    imdbrating?: number | null;
    imdbvotes?: number | null;
    imdbid?: string | null;
    boxoffice?: number | null;
    genres?: number | string[];
    awards?: number | string[];
    countries?: number | string[];
    languages?: number | string[];
    actors?: number | string[];
    directors?: number | string[];
    writers?: number | string[];
}

export interface CategorySerializer {
    name: string;
    movies?: any[];
    category_type: 1 | 2 | 3 | 4;
}

export interface PersonSerializer {
    id?: string;
    acted_movies?: any[];
    written_movies?: any[];
    directed_movies?: any[];
    name: string;
    imdb_id?: string;
}

