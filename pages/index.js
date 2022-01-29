import Header from '../components/header'
import Footer from '../components/footer'
import Head from '../components/head'


export default function Home( { categories, home } ) {

    //console.log(process.env.STRAPI_API_URL);
    console.log(home);

    const myLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }

    const bgUrl = home.data.attributes.image.data.attributes.formats.large.url
    console.log(bgUrl);

    // picture accueil with centered text
    const accueil =  {
        backgroundImage: `url(${bgUrl})`,
    }
    
   
  return (
    <>
        <Head />
        <Header categories ={ categories.data }/>
        <main >
        <div id="accueil" style={accueil} >
          <h1 className="accueil-title">{home.data.attributes.homeTitle}</h1>
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

  const url2 = `${process.env.STRAPI_API_URL}/api/home?populate=*`;
  const response2 = await fetch(url2);
  const home = await response2.json();  

  return {
      props : {
        categories,
        home
      },
      revalidate: 600, // In seconds =)> 10 minutes
  }
}



