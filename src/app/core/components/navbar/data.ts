import { vitest } from "vitest"; 
import { Movies, Result } from "../../../movie/models/movies"; 

export const mockedObjectMedia = Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vitest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vitest.fn(), // Deprecated
    removeListener: vitest.fn(), // Deprecated
    addEventListener: vitest.fn(),
    removeEventListener: vitest.fn(),
    dispatchEvent: vitest.fn(),
  })),
});

export const MOVIES: Movies = {
    page: 1,
    results: [
        {
            adult: false,
            backdrop_path: "/kxQiIJ4gVcD3K6o14MJ72p5yRcE.jpg",
            genre_ids: [],
            id: 123,
            original_language: "en",
            original_title: "The Super Mario Galaxy Movie",
            overview: "Having thwarted Bowser's previous plot to marry Princess Peach, Mario and Luigi now face a fresh threat in Bowser Jr., who is determined to liberate his father from captivity and restore the family legacy. Alongside companions new and old, the brothers travel across the stars to stop the young heir's crusade.",
            popularity: 828.4621,
            poster_path: "/eJGWx219ZcEMVQJhAgMiqo8tYY.jpg",
            release_date: new Date("2026-04-01"),
            title: "The Super Mario Galaxy Movie",
            video: false,
            vote_average: 6.8,
            vote_count: 529
        },
    ],
    total_pages: 1,
    total_results: 1
}