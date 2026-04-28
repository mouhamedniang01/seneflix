/**
 * @last modification : 16-04-2026 
 *  add some attributs
 */
export interface Cast {
  adult?: boolean;
  title?: string;
  video?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id?: number;
  gender?: number;
  original_title?: string;
  origin_country?: string[];
  original_language?: string;
  original_name?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  profile_path?: string;
  first_air_date?: Date;
  name?: string;
  vote_average?: number;
  vote_count?: number;
  character?: string;
  order?: number;
  credit_id?: string;
  episode_count?: number;
  first_credit_air_date?: Date;
  cast_id?: number;
  known_for_department?: string;
  release_date?: Date;
}
