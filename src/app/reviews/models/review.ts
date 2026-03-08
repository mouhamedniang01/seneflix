import {ReviewInfo} from './review.info';

export interface Review {
  id: number
  page: number
  results: ReviewInfo[]
  total_pages: number
  total_results: number
}


