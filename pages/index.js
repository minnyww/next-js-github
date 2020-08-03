import { useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import useSWR from 'swr';
import { fetcher } from '../services/use-swr';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const Main = dynamic(() => import('../components/Main'), {
   loading: () => <p>Loading Main Content...</p>,
});

export default function Home() {
   const router = useRouter();
   const { data, error, isValidating } = useSWR('/api/hello', fetcher, {
      shouldRetryOnError: false,
      errorRetryCount: 3,
      revalidateOnFocus: false,
   });
   console.log('isValidating : ', isValidating);
   //  console.log('data : ', data);

   useEffect(() => {
      router.prefetch('/about');
   }, []);

   if (error) return 'Error to Fetch Data';
   if (!data) return <React.Fragment>Loading...</React.Fragment>;

   return (
      <div className={styles.container}>
         <Head>
            <title>Welcome To Min Land</title>
            <link rel='icon' href='/favicon.ico' />
         </Head>

         <Main data={data} />

         <footer className={styles.footer}>
            <a href='/#' target='_blank' rel='noopener noreferrer'>
               Powered by Min
            </a>
         </footer>
      </div>
   );
}
