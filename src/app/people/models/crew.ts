/**
 * @last modification : 16-04-2026 
 *  add some attributs
 */
export interface Crew {
  adult?: boolean;
  release_date?: Date;
  title?: string;
  video?:boolean
  profile_path?: string;
  gender?: number;
  known_for_department?: string;
  backdrop_path?: string;
  genre_ids?: number[];
  id?: number;
  origin_country?: string[];
  original_language?: string;
  original_name?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  first_air_date?: Date;
  name?: string;
  vote_average?: number;
  vote_count?: number;
  credit_id?: string;
  department?: string;
  episode_count?: number;
  first_credit_air_date?: Date;
  job?: string;
}
