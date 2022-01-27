import Header from '../components/header'
import Footer from '../components/footer'
import Head from '../components/head'


export default function Home( { categories } ) {

 //console.log(process.env.STRAPI_API_URL);
console.log(categories);
// picture accueil with centered text
const accueil =  {
    minHeight: '500px',
    display: 'flex',
    justifyContent: 'center' ,
    alignItems: 'center' ,
    backgroundImage : `url("./images/couple2.jpg")`,
  }


  return (
    <>
        <Head />
        <Header categories ={ categories.data }/>
        <main>
        <div  style = {accueil}>
          <h1 id="accueil">Charles Cantin Photographe</h1>
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