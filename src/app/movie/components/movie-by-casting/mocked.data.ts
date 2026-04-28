import { MovieCast } from "../../../people/models/movie.cast";
import { Credits } from "../../models/credits";
import { MovieDetail } from "../../models/movie-detail"; 

export const MOVIE: MovieCast = {
  cast: [
    {
      adult: false,
      backdrop_path: '/luMg4yboE00qGuSMTQc88UOfVne.jpg',
      genre_ids: [14, 28, 12],
      id: 123,
      original_language: 'ru',
      original_title: 'Легенда о Коловрате',
      overview:"A story of a legendary battle, where seventeen fearless warriors defend their land against an army of thousands well-trained soldiers. In 13th-century Mongol warrior hordes and their leader, Batu Khan, control most of the known world. As the Mongols move towards Europe they invade the last Russian principality standing in their way. Little do they know, their plans are about to be ruined by a small detachment of heroic strong men led by a mysterious brave warrior. This is a story about courage, endurance and self-sacrifice for the sake of one's country. This is the story of Evpaty the Furious.",
      popularity: 3.3536,
      poster_path: '/4XCA70oDgYSBLJDvOgYs1Ca4rBm.jpg',
      release_date: new Date(Date.parse('2017-11-30')),
      title: 'Furious',
      video: false,
      vote_average: 6.053,
      vote_count: 161,
      character: '',
      credit_id: '61accbc015dea00064baec21',
      order: 42,
    },
  ],
  crew: [],
  id: 2182655,
};


export const CREDITS:Credits  = {
    "id": 1262693,
    "cast": [
        {
            "adult": false,
            "gender": 2,
            "id": 2182655,
            "known_for_department": "Acting",
            "name": "Vladimir Lyubimtsev",
            "original_name": "Владимир Любимцев",
            "popularity": 0.1238,
            "profile_path": "/gSN2Dp1ncoyCgc0YSBR4SINRKkO.jpg",
            "cast_id": 2,
            "character": "Muromets",
            "credit_id": "65fc4ee80c125501650a69db",
            "order": 0
        }   
    ],
    "crew": [
        {
            "adult": false,
            "gender": 2,
            "id": 86152,
            "known_for_department": "Directing",
            "name": "Karen Oganesyan",
            "original_name": "Карен Оганесян",
            "popularity": 0.443,
            "profile_path": "/6SDxD4CEvmJ1VFy9zNShU4INhZH.jpg",
            "credit_id": "65fc4ee17707000163076579",
            "department": "Directing",
            "job": "Director"
        }
    ]
}