import axios from 'axios';
import { IJob } from '../types';

export default (
  { locations }: {locations: String[]},
): Promise<IJob[]> => new Promise<IJob[]>((resolve, reject) => {
  axios.get(
    'https://www.amazon.jobs/en/search.json?',
    {
      params: {
        normalized_location: locations,
        radius: '24km',
        offset: '0',
        result_limit: '200',
        sort: 'recent',
        latitude: '',
        longitude: '',
        loc_group_id: '',
        loc_query: '',
        base_query: '',
        city: '',
        country: '',
        region: '',
        county: '',
        query_options: '',
        category: ['software-development'],
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:92.0) Gecko/20100101 Firefox/92.0',
        Accept: 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
      },
    },
  )
    .then((response: {data: {jobs: IJob[]}}) => {
      resolve(response.data.jobs);
    })
    .catch((error) => {
      reject(error);
    });
});
