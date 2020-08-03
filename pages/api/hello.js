// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Axios from 'axios';

export default async (req, res) => {
   res.statusCode = 200;
   const response = await Axios.get('https://api.github.com/users/minnyww');
   res.json(response.data);
};
