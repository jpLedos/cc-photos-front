
import {useState, useEffect} from 'react'
import Link from 'next/link';
import logo from '../public/images/logo_cr.png';
import Image from 'next/image'

function Header({categories}) {

    const [toggle, setToggle] = useState(false)
    const [largeur, setLargeur] = useState()

    const toggleFunc = () => {
        setToggle(!toggle)
      }

      useEffect(() => {
        setLargeur(window.innerWidth);
        // if ((window.innerWidth) < 768) {
        //     setToggle (true);
        //     setTimeout(() => {
        //         setToggle (false);
        //     }, 3000);
        // }
        const changeWidth = () => { 
            setLargeur(window.innerWidth);
        }
        window.addEventListener('resize',changeWidth)  
        
        return () => {
          window.removeEventListener('resize',changeWidth)
        }
    
      }, [])





    return (
        <header>
            <div className = "logo"  style={{textAlign: 'center'}}>
                <Image  
                alt= "logo" 
                src={logo}
                height={200} width={400} />
            </div>
            {(toggle ||largeur > 768) && (
            <nav>     
                <ul id="menu">
                    <li className="nav-item">
                        <Link href="/"><a aria-current="page">Accueil</a></Link>
                    </li>
                    <li className="nav-item dropdown-toggle">
                        <Link href="/galeries">
                        <a role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Galeries</a>
                        </Link>
                        <ul className="dropdown-menu" aria-label="navbarDropdown">
                            {
                            categories.map((category) => {
                                return(
                                    <li key={category.id}>
                                        <Link href={`/galeries?category=${category.attributes.title}`} >
                                            <a className="dropdown-item">{category.attributes.title}</a>
                                        </Link>
                                    </li>
                                )
                            })
                            }
                        </ul>
                    </li>   
                    <li className="nav-item">
                        <Link href="/tarifs"><a aria-disabled="true">Tarifs & Prestations</a></Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/contact"><a  aria-disabled="true">Contact</a></Link>
                    </li>
                </ul>
            </nav>
            )}
                   
            <button id="btn-toogle-menu" onClick={toggleFunc} type="button"> 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"><path fill="none" d="M0 0h24v24H0z"/>
                <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" fill="rgba(144,180,197,1)"/></svg>
            </button>
        </header>
    );
}

export default Header;