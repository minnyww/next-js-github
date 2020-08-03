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

export default function Home({ response }) {
   const router = useRouter();
   const { data, error } = useSWR('/api/hello', fetcher, {
      shouldRetryOnError: false,
      errorRetryCount: 3,
      revalidateOnFocus: false,
   });
   //  console.log('data : ', data);

   useEffect(() => {
      router.prefetch('/about');
   }, []);

   if (error) return 'Error to Fetch Data';
   if (!data)
      return (
         <React.Fragment>
            <Head>
               <meta
                  name='google-site-verification'
                  content='Yki5zGwqQ0krBJ_YuMPzk0XMRUgvFwlkdO2ceqNY1yA'
               />
            </Head>
            Loading...
         </React.Fragment>
      );

   return (
      <div className={styles.container}>
         <Head>
            <title>Welcome To Min Land</title>
            <link rel='icon' href='/favicon.ico' />
            <meta
               name='google-site-verification'
               content='Yki5zGwqQ0krBJ_YuMPzk0XMRUgvFwlkdO2ceqNY1yA'
            />
         </Head>

         <Main data={data} />

         <h4>Test Fetch Api With getStaticProps</h4>
         <ul>
            {response.map((item) => (
               <li key={item.id}>{item.name}</li>
            ))}
         </ul>

         <footer className={styles.footer}>
            <a href='/#' target='_blank' rel='noopener noreferrer'>
               Powered by Min
            </a>
         </footer>
      </div>
   );
}

// use this if you want to get query string
// export async function getServerSideProps({ query }) {
//    console.log('query : ', query);
//    const res = await fetch('https://jsonplaceholder.typicode.com/users');
//    const response = await res.json();
//    return {
//       props: {
//          response,
//       },
//    };
// }

export async function getStaticProps({ query }) {
   console.log('query : ', query);
   const res = await fetch('https://jsonplaceholder.typicode.com/users');
   const response = await res.json();
   return {
      props: {
         response,
      },
   };
}
