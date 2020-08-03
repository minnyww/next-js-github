import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import useSWR from 'swr';
import { fetcher } from '../../services/use-swr';
import { useRouter } from 'next/router';

export default function Home() {
   const { data, error } = useSWR('/api/hello', fetcher, {
      errorRetryCount: 3,
      revalidateOnFocus: false,
   });
   const router = useRouter();

   if (error) return 'Error to Fetch Data';
   if (!data) return 'Loading...';
   return (
      <div className={styles.container}>
         <Head>
            <title>Welcome To {data.name}</title>
            <link rel='icon' href='/favicon.ico' />
         </Head>
         <h2>About Me</h2>
         <img
            src={data.avatar_url}
            alt='cover_image'
            width={120}
            loading='lazy'
         />
         <h3>Name : Apisit Amnuayworrabut</h3>
         <p>Company : {data.company}</p>

         <button onClick={() => router.back()}>Go Back</button>
      </div>
   );
}
