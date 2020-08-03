import { mutate } from 'swr';

export const fetcher = async (url) => {
   const axios = await import('axios');
   try {
      const response = await axios.get(url);
      return response.data;
   } catch (error) {
      console.error(error);
      return Promise.reject(error);
   }
};

export async function prefetch(url) {
   return mutate(url, await fetcher(url), false);
}
