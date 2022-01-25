import Header from '../components/header'
import Footer from '../components/footer'
import Head from '../components/head'


export default function Home( { categories } ) {

console.log(process.env.STRAPI_API_URL);

  return (
    <>
        <Head />
        <Header categories ={ categories.data }/>
        <main>
        <div  id='accueil'>
          <h1>Charles Cantin Photographe</h1>
        </div>   
        
        </main>
        <Footer />
    </>
  )
}

export const getStaticProps = async () => {
  const url =`${process.env.STRAPI_API_URL}/api/categories`;
  //console.log(url);
  const response = await fetch(url);
  const categories = await response.json();  

  return {
      props : {
        categories,
      },
  }
}