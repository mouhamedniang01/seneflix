import { Review } from "../../../reviews/models/review";
import { Credits } from "../../models/credits";
import { MovieDetail } from "../../models/movie-detail";
import { Movies, Result } from "../../models/movies";

export const mockMovie : MovieDetail |Result = {
    adult: false,
    backdrop_path: "/1x9e0qWonw634NhIsRdvnneeqvN.jpg",
    belongs_to_collection: null ,
    budget: 0,
    genres: [
        {
            "id": 10749,
            "name": "Romance"
        },
        {
            "id": 18,
            "name": "Drama"
        }
    ],
    "homepage": "",
    "id": 1523145,
    "imdb_id": "tt38190257",
    "origin_country": [
        "RU"
    ],
    "original_language": "ru",
    "original_title": "Твоё сердце будет разбито",
    "overview": "High school student Polina is saved from bullying at her new school and makes a deal with the main bully Bars: he must pretend to be her boyfriend and protect her, and she must do everything he says. During this game, the couple develops real feelings, but her family and classmates have reasons to separate the lovers.",
    "popularity": 430.5174,
    "poster_path": "/7wIBfBl2gejt6xHxNSK0reVIm7E.jpg",
    "production_companies": [
        {
            "id": 71928,
            "logo_path": "/7M6z2jX570P3HzNQULCTjlZcXkB.png",
            "name": "All Media A Start Company",
            "origin_country": "RU"
        },
        {
            "id": 114676,
            "logo_path": "/aVsos0RDN9Ib7H8nW5Vv5kHKykz.png",
            "name": "START Studio",
            "origin_country": "RU"
        },
        {
            "id": 13850,
            "logo_path": "/6KsdcnTIpQ47NHad4EtxOCkB94K.png",
            "name": "Sverdlovsk Film Studio",
            "origin_country": "RU"
        },
        {
            "id": 42877,
            "logo_path": "/15THT1W3NROsbDXPbrcmWFVkrSv.png",
            "name": "Yellow, Black & White",
            "origin_country": "RU"
        },
        {
            "id": 119813,
            "logo_path": "/iyGJzcnWXZoNxYLzZu4jKzxIoFw.png",
            "name": "Premier Studios",
            "origin_country": "RU"
        }
    ],
    "production_countries": [
        {
            "iso_3166_1": "RU",
            "name": "Russia"
        }
    ],
    release_date: new Date(Date.parse('2026-02-02')),
    "revenue": 0,
    "runtime": 134,
    "spoken_languages": [
        {
            "english_name": "Spanish",
            "iso_639_1": "es",
            "name": "Español"
        }
    ],
    "status": "Released",
    "tagline": "",
    "title": "Your Heart Will Be Broken",
    "video": false,
    "vote_average": 7.213,
    "vote_count": 61
}

export const similarMovies: Movies = {
    page: 1,
    results: [
        mockMovie 
    ],
    total_pages: 1,
    total_results: 1,
    dates: {
        maximum: '10-01-2026',
        minimum:'30-01-2026'
    }
}

export const mockedVideo = {
    "id": 1523145,
    "results": []
}

export const credit:Credits = {
    "id": 1523145,
    "cast": [
        {
            genre_ids:[],
            adult: false, 
            id: 5598110, 
            name: "Daniel Vegas",
            original_name: "Даниэль Вегас",
            popularity: 8.9146,
            profile_path: "/t9AFZX1rpTt59npITX2GY3JgySd.jpg",
            character: "Bars",
            credit_id: "688b9cc6b5470c1740948c64",
            order: 0
        },
        {
            "adult": false, 
            "id": 5037367,
           
            "name": "Veronika Zhuravleva",
            "original_name": "Вероника Журавлёва",
            "popularity": 8.45,
            "profile_path": "/bvlry6DeiYkm0onAZhonlpl4J7.jpg",
            "cast_id": 1,
            "character": "Polina",
            "credit_id": "688b9c6006851bb0a7948e31",
            "order": 1
        },
        {
            "adult": false,
            "id": 4508505,
            "name": "Ivan Trushin",
            "original_name": "Иван Трушин",
            "popularity": 1.739,
            "profile_path": "/8DWSEUJnxlr7kTP0O8iOSnsqbcs.jpg",
            "cast_id": 15,
            "character": "Laym",
            "credit_id": "68af80b0e3253447084ebfef",
            "order": 2
        },
        {
            "adult": false,
           
            "id": 2007622,
            "name": "Maksim Saprykin",
            "original_name": "Максим Сапрыкин",
            "popularity": 1.4096,
            "profile_path": "/u6c2wEvtqhXHyYRqd2LXKsyHr5a.jpg",
            "cast_id": 12,
            "character": "Lyokha",
            "credit_id": "68af809bb763b169df3908d2",
            "order": 3
        },
        {
            "adult": false,
            "gender": 1,
            "id": 5654199,
           
            "name": "Alya Mayer",
            "original_name": "Аля Майер",
            "popularity": 0.4693,
            "cast_id": 11,
            "character": "",
            "credit_id": "68af8093d242e00c0b624c8b",
            "order": 4
        },
        {
            "adult": false,
            "gender": 1,
            "id": 558048,
           
            "name": "Evgeniya Loza",
            "original_name": "Евгения Лоза",
            "popularity": 1.2465,
            "profile_path": "/ruLILWf9x0gxg8o9W9Yj9LCI0us.jpg",
            "cast_id": 13,
            "character": "",
            "credit_id": "68af80a18ddd56dc0bfa9675",
            "order": 5
        },
        {
            "adult": false,
           
            "id": 1565264,
           
            "name": "Pavel Kuzmin",
            "original_name": "Павел Кузьмин",
            "popularity": 0.812,
            "profile_path": "/uIIS1FLF4zMxR0Sj53a4wc9tGU6.jpg",
            "cast_id": 14,
            "character": "Polina's Stepfather",
            "credit_id": "68af80a95dfb80f4abf39497",
            "order": 6
        },
        {
            "adult": false,
            "gender": 1,
            "id": 4465638,
           
            "name": "Alexandra Tikhonova",
            "original_name": "Александра Тихонова",
            "popularity": 0.7183,
            "profile_path": "/iZL6tYLqs5uhvqE4SM7GwJHxUz3.jpg",
            "cast_id": 16,
            "character": "",
            "credit_id": "68af80b701ec399c9c3907ad",
            "order": 7
        },
        {
            "adult": false,
            "gender": 1,
            "id": 2887356,
           
            "name": "Margarita Dyachenkova",
            "original_name": "Маргарита Дьяченкова",
            "popularity": 0.9663,
            "profile_path": "/a3c2BqkxkZBlJNKFtZTjxZUiLvZ.jpg",
            "cast_id": 17,
            "character": "Lika",
            "credit_id": "68af80be094daa6ff54ec0f5",
            "order": 8
        },
        {
            "adult": false,
           
            "id": 5654204,
           
            "name": "Anton Solomatin",
            "original_name": "Антон Соломатин",
            "popularity": 0.132,
            "profile_path": "/rsiqKjHvpQGmDvba4TMpe8Rt8hj.jpg",
            "cast_id": 18,
            "character": "",
            "credit_id": "68af80c7e3253447084ebffa",
            "order": 9
        },
        {
            "adult": false,
            "gender": 1,
            "id": 2284056,
           
            "name": "Diana Gil",
            "original_name": "Диана Гиль",
            "popularity": 0.049,
            
            "cast_id": 19,
            "character": "Milana",
            "credit_id": "68af80ce8ddd56dc0bfa967b",
            "order": 10
        },
        {
            "adult": false,
            "gender": 0,
            "id": 3291890,
           
            "name": "Alexander Prismotrov-Belov",
            "original_name": "Александр Присмотров-Белов",
            "popularity": 0.1062,
            "profile_path": "/3KUCgPhwzUaOMLOWOueF4il2PjZ.jpg",
            "cast_id": 20,
            "character": "",
            "credit_id": "68af80d6c542cb3916f395eb",
            "order": 11
        },
        {
            "adult": false,
           
            "id": 235408,
           
            "name": "Andrey Kazakov",
            "original_name": "Андрей Казаков",
            "popularity": 0.4822,
            "profile_path": "/ozbnnYZvapJdCwFQHr6mr5I8NCR.jpg",
            "cast_id": 21,
            "character": "",
            "credit_id": "68af80dd99cfa3794c390953",
            "order": 12
        },
        {
            "adult": false,
            "gender": 1,
            "id": 5654210,
           
            "name": "Polina Vereshchagina",
            "original_name": "Полина Верещагина",
            "popularity": 0.0143,
            
            "cast_id": 22,
            "character": "",
            "credit_id": "68af80edb11f422cc13d8cea",
            "order": 13
        },
        {
            "adult": false,
            "gender": 1,
            "id": 5654212,
           
            "name": "Natalia Derbeneva",
            "original_name": "Наталия Дербенева",
            "popularity": 0.0362,
            
            "cast_id": 23,
            "character": "",
            "credit_id": "68af80f499cfa3794c390960",
            "order": 14
        },
        {
            "adult": false,
            "gender": 1,
            "id": 5654214,
           
            "name": "Milanya Kanash",
            "original_name": "Миланья Канаш",
            "popularity": 0.0482,
            
            "cast_id": 24,
            "character": "",
            "credit_id": "68af80fac162f708ac3909fa",
            "order": 15
        },
        {
            "adult": false,
           
            "id": 3327107,
           
            "name": "Oleg Milyakhovsky",
            "original_name": "Олег Миляховский",
            "popularity": 0.0963,
            
            "cast_id": 25,
            "character": "",
            "credit_id": "68af810106297cf5e34ec035",
            "order": 16
        },
        {
            "adult": false,
            "gender": 1,
            "id": 5654217,
           
            "name": "Sofia Golubeva",
            "original_name": "София Голубева",
            "popularity": 0.0584,
            "profile_path": "/taEsQSdqgJisdeA0lnsVwwzSoaO.jpg",
            "cast_id": 26,
            "character": "Malinovskaya's Unit",
            "credit_id": "68af811329cc9a2270b3752f",
            "order": 17
        },
        {
            "adult": false,
           
            "id": 2180646,
           
            "name": "Ramaz Chiaureli",
            "original_name": "Рамаз Чиаурели",
            "popularity": 0.1785,
            "profile_path": "/nKF348zWAdgu8ccQB56JIE8snzb.jpg",
            "cast_id": 27,
            "character": "",
            "credit_id": "68af811906297cf5e34ec038",
            "order": 18
        },
        {
            "adult": false,
            "gender": 1,
            "id": 5654220,
           
            "name": "Alexandra Leonova",
            "original_name": "Александра Леонова",
            "popularity": 0.0389,
            
            "cast_id": 28,
            "character": "",
            "credit_id": "68af81204d7780fe63624dc8",
            "order": 19
        },
        {
            "adult": false,
            "gender": 1,
            "id": 5654222,
           
            "name": "Daria Rasheeva",
            "original_name": "Дарья Рашеева",
            "popularity": 0.0379,
            
            "cast_id": 29,
            "character": "",
            "credit_id": "68af81277b60f4d4ba4ed447",
            "order": 20
        },
        {
            "adult": false,
            "gender": 1,
            "id": 5654223,
           
            "name": "Diana Lyschik",
            "original_name": "Диана Лыщик",
            "popularity": 0.0496,
            
            "cast_id": 30,
            "character": "",
            "credit_id": "68af812dcc50eefc3b624eb2",
            "order": 21
        },
        {
            "adult": false,
           
            "id": 2008813,
           
            "name": "Viktor Konukhin",
            "original_name": "Виктор Конухин",
            "popularity": 0.34,
            "profile_path": "/kGS8hGzlXeKNG71hPOjI8v0AY5d.jpg",
            "cast_id": 31,
            "character": "",
            "credit_id": "68af8136c1e5e784c80f8e52",
            "order": 22
        },
        {
            "adult": false,
           
            "id": 1030492,
           
            "name": "Georgiy Gromov",
            "original_name": "Георгий Громов",
            "popularity": 0.0741,
            "profile_path": "/mwvQ6b3Puvrm7MGiHCiOCP0cFFp.jpg",
            "cast_id": 32,
            "character": "",
            "credit_id": "68af813d504dc8189856bba8",
            "order": 23
        },
        {
            "adult": false,
           
            "id": 5654229,
           
            "name": "Daymon Cherednik",
            "original_name": "Даймон Чередник",
            "popularity": 0.0453,
            "profile_path": "/d4NILyH9T7xikAgQqsKpWBqJKsY.jpg",
            "cast_id": 33,
            "character": "",
            "credit_id": "68af814e29cc9a2270b37539",
            "order": 24
        },
        {
            "adult": false,
            "gender": 1,
            "id": 3773982,
           
            "name": "Alisa Mazurina",
            "original_name": "Алиса Мазурина",
            "popularity": 0.0707,
            
            "cast_id": 34,
            "character": "",
            "credit_id": "68af815629e1379be10f8e32",
            "order": 25
        },
        {
            "adult": false,
           
            "id": 5654233,
           
            "name": "Dmitry Nikonov",
            "original_name": "Дмитрий Никонов",
            "popularity": 0.0143,
            
            "cast_id": 35,
            "character": "",
            "credit_id": "68af815e4d7780fe63624ddd",
            "order": 26
        },
        {
            "adult": false,
           
            "id": 5654234,
           
            "name": "Mikhail Shimansky",
            "original_name": "Михаил Шиманский",
            "popularity": 0.0362,
            
            "cast_id": 36,
            "character": "",
            "credit_id": "68af816408850157ddb375e8",
            "order": 27
        },
        {
            "adult": false,
            "gender": 1,
            "id": 5654236,
           
            "name": "Polina Kareva",
            "original_name": "Полина Карева",
            "popularity": 0.0453,
            "profile_path": "/xVllQNEv2ZFqFG7WLe1BKQgoR43.jpg",
            "cast_id": 37,
            "character": "",
            "credit_id": "68af816a163a301dd256bc15",
            "order": 28
        }
    ],
    "crew": [
        {
            "adult": false,
           
            "id": 1547457,
            "known_for_department": "Directing",
            "name": "Mikhail Vaynberg",
            "original_name": "Михаил Вайнберг",
            "popularity": 1.3666,
            "profile_path": "/m2gtdkNGGMkE6LUevQpA7xvYq6p.jpg",
            "credit_id": "688ba3c37ce6d7d12b948a46",
            "department": "Directing",
            "job": "Director"
        },
        {
            "adult": false,
           
            "id": 1650368,
            "known_for_department": "Production",
            "name": "Georgy Shabanov",
            "original_name": "Георгий Шабанов",
            "popularity": 0.0989,
            "profile_path": "/tXp1N4sr281y9PeF9k7CrDlrTr3.jpg",
            "credit_id": "688ba3dbce7b372afc51d5c8",
            "department": "Production",
            "job": "Producer"
        },
        {
            "adult": false,
            "gender": 1,
            "id": 5038055,
            "known_for_department": "Production",
            "name": "Lusya Dadalyan",
            "original_name": "Люся Дадальян",
            "popularity": 0.0599,
            
            "credit_id": "688ba3ec4cf2373ea1767fac",
            "department": "Production",
            "job": "Producer"
        },
        {
            "adult": false,
            "gender": 1,
            "id": 557960,
            "known_for_department": "Directing",
            "name": "Alyona Zvantsova",
            "original_name": "Алёна Званцова",
            "popularity": 0.2295,
            "profile_path": "/z3mAtNGYnR7fJDSgkdaprDX1cDj.jpg",
            "credit_id": "688ba4003c88a0676d768176",
            "department": "Production",
            "job": "Producer"
        },
        {
            "adult": false,
           
            "id": 4200349,
            "known_for_department": "Production",
            "name": "Viktor Shadrin",
            "original_name": "Виктор Шадрин",
            "popularity": 0.0281,
            
            "credit_id": "688ba41abc5af0c058b5b534",
            "department": "Production",
            "job": "Producer"
        },
        {
            "adult": false,
           
            "id": 1690123,
            "known_for_department": "Camera",
            "name": "Konstantin Postnikov",
            "original_name": "Константин Постников",
            "popularity": 0.0214,
            "profile_path": "/5DdQvTnPPlZtFYO3evW3ixSnR54.jpg",
            "credit_id": "688ba43ac3cb64c7a35e32b6",
            "department": "Camera",
            "job": "Director of Photography"
        },
        {
            "adult": false,
           
            "id": 2170603,
            "known_for_department": "Art",
            "name": "Vadim Shafransky",
            "original_name": "Вадим Шафранский",
            "popularity": 0.0439,
            "profile_path": "/ouQMi5TOQAWFYzKxUGHLLR3laP9.jpg",
            "credit_id": "688ba48fa0aa2e3ddd767fb4",
            "department": "Art",
            "job": "Production Design"
        },
        {
            "adult": false,
            "gender": 1,
            "id": 5598151,
            "known_for_department": "Writing",
            "name": "Anna Jane",
            "original_name": "Анна Джейн",
            "popularity": 1.2495,
            "profile_path": "/9mHpxxG6QVxkvpFT7CYUhQY768S.jpg",
            "credit_id": "6975edd7ef911f4ad2a3800b",
            "department": "Writing",
            "job": "Novel"
        }
    ]
}

export const mockReviews: Review = {
    "id": 1523145,
    "page": 1,
    "results": [],
    "total_pages": 0,
    "total_results": 0
}