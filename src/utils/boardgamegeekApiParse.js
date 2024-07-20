const axios = require('axios')
const xml2js = require('xml2js')

async function fetchAndParseXML(url) {
    try {
        const response = await axios.get(url);
        const parsedData = await xml2js.parseStringPromise(response.data);
        const boardgameContent = parsedData.boardgames.boardgame[0];

        let boardgameName = "";
        for (const name of boardgameContent.name) {
            if (name.$.primary === 'true') {
                boardgameName = name._;
                break
            }
        }
        const boardgameDescription = boardgameContent.description[0];
        const boardgameGeekRef = boardgameContent.$.objectid;
        const yearPublished = boardgameContent.yearpublished[0];
        const minPlayers = parseInt(boardgameContent.minplayers[0], 10);
        const maxPlayers = parseInt(boardgameContent.maxplayers[0], 10);
        const playTime = parseInt(boardgameContent.playingtime[0], 10);
        const thumbnail = boardgameContent.thumbnail[0];
        const image = boardgameContent.image[0];

        return {
            name: boardgameName,
            boardgamegeekref: boardgameGeekRef,
            yearpublished: yearPublished,
            minplayers: minPlayers,
            maxplayers: maxPlayers,
            playtime: playTime,
            description: boardgameDescription,
            thumbnail: thumbnail,
            image: image
        }

    } catch (error) {
        console.error('Error fetching or parsing XML data: ', error)
        return null
    }
}

module.exports = fetchAndParseXML