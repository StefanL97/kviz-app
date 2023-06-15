import React from "react"
import './css.css'
import slika from '../images/pocetna.jpg';
export const Pocetna =() => {
    return (
        <div>
            <br></br><br></br><br></br><br></br><br></br>
            <img class="mx-auto d-block" style={{marginRight:"200px"}} src={slika}></img>
            <br></br><br></br>
         <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6 text-center">
          
            
            
            <h2 data-aos="fade-down" class="aos-init aos-animate">Dobrodošli na sajt <span>za igranje kvizova</span></h2>
            <p data-aos="fade-up" class="aos-init aos-animate">Ovaj sajt je zabavnog karaktera. Napravite nalog, prijavite se i okušajte znanje u mnogim kvizovima iz raznih kategorija, ili kreirajte vlastite i testirajte znanje drugih korisnika.</p>
            <p data-aos="fade-up" class="aos-init aos-animate">Ukoliko ste se prijavili, </p>
            <a data-aos="fade-up" data-aos-delay="200" href="/quizzes" class="btn btn-primary btn-lg active"> Započnite sa igrom </a>
          </div>
        </div>
      </div>
        </div>
        
    )
}