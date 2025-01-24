import {Dates} from './dates';
import {Result} from './result';

export interface Movie {
  dates: Dates
  page: number
  results: Result[]
  total_pages: number
  total_results: number
}


