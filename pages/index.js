import { useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import useSWR from 'swr';
import { fetcher } from '../services/use-swr';
import { useRouter } from 'next/router';

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

         <main className={styles.main}>
            <h1 className={styles.title}>
               Welcome to <a href={data.html_url}>Min Land</a>
            </h1>
            <img
               src={data.avatar_url}
               alt='cover_image'
               width={120}
               loading='lazy'
            />
            <h2 className={styles.title}>Follwer : {data.followers}</h2>
            <h2 className={styles.title}>Follwer : {data.following}</h2>
            <h3>
               Repo : <a href={data.html_url}>{data.html_url}</a>
            </h3>
            <a href='/about'>Go to about</a>
         </main>

         <footer className={styles.footer}>
            <a href='/#' target='_blank' rel='noopener noreferrer'>
               Powered by Min
            </a>
         </footer>
      </div>
   );
}
