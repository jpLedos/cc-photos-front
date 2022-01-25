import Header from '../../components/header'
import Footer from '../../components/footer'
import Head from '../../components/head'

export default function Galerie({ categories }) {

    const validateForm = () =>                                 
    { 
        let formOk= true;

        const contact = document.getElementById("contact");
        const email = document.getElementById("email");
        const tel = document.getElementById("tel");        
        const message = document.getElementById("message");
                
        if (contact.value == ""){ 
            document.getElementById('errorContact').innerHTML="Veuillez entrez un nom valide";  
            contact.focus(); 
            formOk= false; 
        }else{
            document.getElementById('errorContact').innerHTML="";  
        }

        if  (!email.value.match(/[a-z0-9_\-\.]+@[a-z0-9_\-\.]+\.[a-z]+/i)){ 
            document.getElementById('errorEmail').innerHTML="Veuillez entrez un email valide";  
            email.focus(); 
            formOk =  false; 
        }else{
            document.getElementById('errorEmail').innerHTML="";  
        }

        if (!tel.value.match( /^0[1-6]\d{8}$/) ){ 
            document.getElementById('errorTel').innerHTML="Veuillez entrez un telephone valide";  
            tel.focus(); 
            formOk = false;
        }else{
            document.getElementById('errorTel').innerHTML="";  
        }

        if (message.value == ""){ 
            document.getElementById('errorMessage').innerHTML="Veuillez entrez un message";  
            message.focus(); 
            formOk = false; 
        }else{
            document.getElementById('errorMessage').innerHTML="";  
        }

        return formOk;
    }


    const handleSubmit =(e) => {
        e.preventDefault();
        if(validateForm()) {

            const contact = document.getElementById("contact").value;
            const email = document.getElementById("email").value;
            const tel = document.getElementById("tel").value;        
            const category = document.getElementById("choice-category")
            .options[document.getElementById('choice-category').selectedIndex].value
            const message = document.getElementById("message").value;

            const apiSuccess = document.getElementById("apiSuccess")
            const apiError = document.getElementById("apiError")

            const payload = {
                contact,
                email, 
                tel,
                category,
                message,
            }
            //console.log({data : payload});
         
            const url =`${process.env.STRAPI_API_URL}/api/emails`;
            //console.log("post : " + url);
            fetch("url",{
                method : "POST" ,
                headers : {
                    "content-type" : "application/json",
                },
                body : JSON.stringify({data : payload}),
            }).then(response => {
                console.log(response);
            if(response.statusText === 'OK'){
                    document.forms['contact'].reset();
                    apiSuccess.innerHTML="Merci pour votre message qui a bien été envoyé !"
                    apiError.innerHTML=""

            } else {
                apiSuccess.innerHTML=""
                apiError.innerHTML="Une erreur est survenue lors de l envoi du message !"
            };
            })
        }

    }


return (

    <>
        <Head />
        <Header categories ={ categories.data } />
        <main>
            <h1>Contact</h1>
            <h2>M'envoyer un message</h2>
            <div className="msg">
                <p className="msgSuccess" id="apiSuccess"></p>
                <p className="msgError" id="apiError"></p>
            </div>
            <form name="contact" action="https://formspree.io/f/mjvlgznz" encType="multipart/form-data" method='POST'>
                <div className="form-control">
                    <input type="text" id="contact" name="contact" required aria-required="true" placeholder="Nom et prénom"/>
                    <span className="msgError" id="errorContact"></span>
                </div>
                <div className="form-control">
                    <input type="email" id="email" name="email" required aria-required="true" className="form-control" placeholder="Votre Email"/>  
                    <span className="msgError" id="errorEmail"></span>
                </div>
                <div className="form-control">
                    <input type="tel" id="tel" name ="tel" required aria-required="true" className="form-control" placeholder="Votre téléphone"/>
                    <span className="msgError" id="errorTel"></span>
                </div>
                <div>
                    <select name="category" id="choice-category" required aria-required="true" >
                        <option disabled selected>Prestation</option>
                        {
                            categories.data.map((category) => {
                                return(
                                    <option key={category.id} value = {category.attributes.title}>
                                    {category.attributes.title}
                                    </option>
                                )
                            })    
                        }
                    </select>
                </div>
                <div>
                    <textarea name="message" id="message" required aria-required="true" cols="40" rows="8" placeholder="Votre message"></textarea>
                    <span className="msgError" id="errorMessage"></span>
                </div>
                <div><button onClick= {handleSubmit}  type="submit" className="btn-contact">Envoyer le message</button></div>   
            </form>

        </main>
        <Footer />
    </>
  )
}


export const getStaticProps = async () => {
  const url =  `${process.env.STRAPI_API_URL}/api/categories`;
  const response = await fetch(url);
  const categories = await response.json();  

  return {
      props : {
        categories,
      },
  }
}