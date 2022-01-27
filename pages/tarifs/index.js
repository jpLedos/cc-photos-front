import Image from 'next/image'
import Head from '../../components/head'
import Header from '../../components/header'
import Footer from '../../components/footer'

export default function Galerie({ categories, prices }) {

  const myLoader = ({ src, width, quality }) => {
    return `${process.env.STRAPI_API_URL}${src}?w=${width}&q=${quality || 75}`
  }


  const pricesList =  prices.data;
  const imageRatio = 1;

return (

    <>
        <Head />
        <Header categories ={ categories.data } />
        <main>
            <h1>Tarifs & Prestations</h1>
            <div className="card-container">
            {
            pricesList.map((price) => {
                return(
                <>
                    <div className="card">
                        <h2 className="card-title">{price.attributes.title}</h2>
                        <div className= "card-image" key={price.id} >
                            <Image
                                loader = {myLoader}
                                key={price.id}
                                src={price.attributes.image.data.attributes.formats.small.url}
                                alt={price.attributes.title}
                                width={Math.floor(price.attributes.image.data.attributes.formats.small.width  /imageRatio)}
                                height={Math.floor(price.attributes.image.data.attributes.formats.small.height /imageRatio)}
                            
                            />
                        </div>
                        <p className="card-content">{price.attributes.description}</p>
                        <div className="card-price">{price.attributes.price} €</div>
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
    const url = `${process.env.STRAPI_API_URL}/api/categories`;
  const response = await fetch(url);
  const categories = await response.json();  

  const url2 = `${process.env.STRAPI_API_URL}/api/prices?populate=*`;
  const response2 = await fetch(url2);
  const prices = await response2.json();  

  return {
      props : {
        categories,
        prices,
      },
      revalidate: 600, // In seconds =)> 10 minutes
  }
}