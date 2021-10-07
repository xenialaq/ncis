import axios from 'axios';
import * as cheerio from 'cheerio';

export default ({ jobPath }) => new Promise((resolve, reject) => {
  axios.get(
    `https://www.amazon.jobs${jobPath}`,
    {
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:92.0) Gecko/20100101 Firefox/92.0',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
      },
    },
  )
    .then((response) => {
      setTimeout(() => {
        const html = response.data;
        const $ = cheerio.load(html);
        resolve($('.team-icon > div:nth-child(1) > a:nth-child(1)').text());
      }, 2000);
    })
    .catch((error) => {
      reject(error);
    });
});
