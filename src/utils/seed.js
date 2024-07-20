// seed.js
const dotenv = require('dotenv');
const fetchAndParseXML = require('./boardgamegeekApiParse');
const { Game } = require('../models/models');
const { databaseConnector, databaseDisconnector, databaseClear } = require('./database');
const { databaseURL } = require('../config/config');

dotenv.config();

async function seedGames() {
    const seedIDs = [234931, 149296, 15045, 151347, 150376, 164153, 124742, 175324, 185104, 18901, 233078, 141430, 163745, 1931, 2452, 1917, 320, 4864, 1294, 15046, 71921, 312267, 296912, 192291, 128882, 54043, 343629, 50381, 62871, 140934, 2223, 179172, 244500, 341772, 110327, 338521, 280986, 1927, 181304, 237182, 161970, 39856, 160069, 124172];

    try {
        await databaseConnector(databaseURL);
        console.log('Connected to MongoDB');

        await databaseClear(); // Optional: clear the database before seeding

        for (const id of seedIDs) {
            const url = `https://boardgamegeek.com/xmlapi/boardgame/${id}`;
            const gameData = await fetchAndParseXML(url);
            if (gameData) {
                await Game.create(gameData);
                console.log(`Inserted game data for ID: ${id}`);
            } else {
                console.log(`Failed to insert game data for ID: ${id}`);
            }
        }

        console.log('Seeding completed');
    } catch (error) {
        console.error('Error seeding games: ', error);
    } finally {
        await databaseDisconnector();
    }
}

seedGames();