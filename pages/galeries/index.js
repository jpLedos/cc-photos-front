import Image from 'next/image'
import { useRouter } from "next/router";
import Head from '../../components/head'
import Header from '../../components/header'
import Footer from '../../components/footer'

export default function Galerie({ categories, galleries }) {

  const myLoader = ({ src, width, quality }) => {
    return `http://localhost:1337${src}?w=${width}&q=${quality || 75}`
  }

  const { query } = useRouter();
  let filteredCategories = galleries.data
  if((query.category)) {
      filteredCategories = galleries.data.filter(c => c.attributes.category.data.attributes.title === query.category)
    }

    
  

return (

    <>
        <Head />
        <Header categories ={ categories.data } />
        <main>
            <h1>Galerie Photos</h1>
            <div className="gallery">
            {
            filteredCategories.map((gallery) => {
                return(
                <>
                    <div className={`image-container ${gallery.attributes.category.data.attributes.title}`} key={gallery.id} >
                        <Image
                            loader = {myLoader}
                            src={gallery.attributes.picture.data.attributes.formats.small.url}
                            alt={gallery.attributes.title}
                            width={Math.floor(gallery.attributes.picture.data.attributes.formats.small.width  /1.3)}
                            height={Math.floor(gallery.attributes.picture.data.attributes.formats.small.height /1.3)}
                        
                        />
                    </div>
                </>    
                )
            })
            }
            </div>

        </main>
        <Footer />
    </>
  )
}


export const getStaticProps = async () => {
  const url = `${process.env.STRAPI_API_URL}categories`;
  const response = await fetch(url);
  const categories = await response.json();  
  const url2 = `${process.env.STRAPI_API_URL}galleries?populate=*`;

  const response2 = await fetch(url2);
  const galleries = await response2.json();  

  return {
      props : {
        categories,
        galleries,
      },
  }
}