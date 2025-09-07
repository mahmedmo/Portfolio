/**
 * Song Configuration
 *
 * Curated playlist of Pokemon jazz songs with precise timestamps.
 * Each entry contains the start time (in seconds), title, and source game.
 *


 */

export const SONG_PLAYLIST = [
    { time: 0, title: "Pokémon Center", game: "Pokemon Red/Blue" },
    { time: 174, title: "Emotion (An Unwavering Heart)", game: "Pokemon Black/White" },
    { time: 311, title: "Route 209", game: "Pokemon Diamond/Pearl" },
    { time: 479, title: "New Bark Town", game: "Pokemon Gold/Silver/Crystal" },
    { time: 611, title: "Accumula Town", game: "Pokemon Black/White" },
    { time: 809, title: "Nuvema Town", game: "Pokémon Black/White" },
    { time: 961, title: "Eterna City", game: "Pokemon Diamond/Pearl" },
    { time: 1105, title: "Ecruteak / Cianwood City", game: "Pokemon Gold/Silver/Crystal" },
    { time: 1284, title: "Village Bridge", game: "Pokemon Black/White" },
    { time: 1442, title: "Soaring Illusions", game: "Pokemon Omega Ruby/Alpha Sapphire" },
    { time: 1570, title: "Jubilife Village", game: "Pokemon Legends: Arceus" },
    { time: 1708, title: "Field (Midnight)", game: "Pokemon Legends: Arceus" },
    { time: 1838, title: "South Province", game: "Pokemon Scarlet/Violet" },
    { time: 2046, title: "Lavender Town", game: "Pokemon Gold/Silver/Crystal" },
    { time: 2258, title: "Pokémon League", game: "Pokemon Diamond/Pearl" },
    { time: 2424, title: "Littleroot Town", game: "Pokemon Ruby/Sapphire/Emerald" },
    { time: 2563, title: "Undella Town", game: "Pokemon Black/White" },
    { time: 2730, title: "Surf Theme", game: "Pokemon Gold/Silver/Crystal" },
    { time: 2941, title: "Floaroma Town", game: "Pokemon Diamond/Pearl" },
    { time: 3113, title: "Pallet Town", game: "Pokemon Red/Blue" },
    { time: 3268, title: "Legends Arceus", game: "Pokemon Legends: Arceus" },
    { time: 3449, title: "Lillie's Theme", game: "Pokemon Sun/Moon" },
    { time: 3661, title: "Azalea Town", game: "Pokemon Gold/Silver/Crystal" },
    { time: 3853, title: "Twinleaf Town", game: "Pokemon Diamond/Pearl" },
    { time: 4024, title: "National Park", game: "Pokemon Gold/Silver/Crystal" },
    { time: 4216, title: "Route 104", game: "Pokemon Ruby/Sapphire/Emerald" },
    { time: 4408, title: "Viridian / Pewter / Saffron City", game: "Pokemon Gold/Silver/Crystal" },
    { time: 4577, title: "Canalave City", game: "Pokemon Diamond/Pearl" },
    { time: 4749, title: "Lake Verity", game: "Pokemon Diamond/Pearl" },
    { time: 4990, title: "Snowbelle City", game: "Pokemon X/Y" },
    { time: 5135, title: "Violet / Olivine City", game: "Pokemon Gold/Silver/Crystal" },
    { time: 5307, title: "Verdanturf Town", game: "Pokemon Ruby/Sapphire/Emerald" },
    { time: 5486, title: "Goldenrod City", game: "Pokemon Gold/Silver/Crystal" },
    { time: 5661, title: "Memories Returned", game: "Pokemon Mystery Dungeon: Explorers of Time and Darkness" }
];

/**
 * Music player configuration
 */
export const MUSIC_CONFIG = {
    FADE_VOLUME: 0.3,
    FADE_STEP: 0.01,
    FADE_INTERVAL: 80,
    SONG_CHECK_INTERVAL: 1000,
    NOTIFICATION_COOLDOWN: 4000,
    UP_NEXT_COOLDOWN: 3000,
    UP_NEXT_TRIGGER_TIME: 5,
    NOTIFICATION_DISPLAY_TIME: 4000,
    UP_NEXT_DISPLAY_TIME: 3000
};