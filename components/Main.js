import styles from '../styles/Home.module.css';
export default function Main({ data }) {
   return (
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
   );
}
