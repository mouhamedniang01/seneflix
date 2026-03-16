import {Crew} from '../../people/models/crew';
import {Cast} from '../../people/models/cast';

export interface Credits {
  id: number
  cast: Cast[]
  crew: Crew[]
}

