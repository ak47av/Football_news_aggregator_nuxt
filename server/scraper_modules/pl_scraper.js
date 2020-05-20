const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.premierleague.com/stats/top/players/goals?se=-1';

axios(url)
  .then(response=>{
    const html = response.data;
    const $ = cheerio.load(html);
    const statsTable = $('.statsTableContainer > tr');

    const topScorers = [];

    statsTable.each(function () {
      const rank = $(this).find('.rank>strong').text();
      const playerName = $(this).find('.playerName > strong').text();
      const nationality = $(this).find('.playerCountry').text();
      const goals = $(this).find('.mainStat').text();

      topScorers.push({
        rank,
        name: playerName,
        nationality,
        goals,
      });
    });

    console.log(topScorers);
  })
  .catch(console.error);
