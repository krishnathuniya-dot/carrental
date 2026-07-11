
import React, { useState } from "react";
import "../css/about.css"

export default function Aboutus() {
   const [formData, setFormData] = useState({
   
      email: ""
     
    });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const res = await fetch("http://localhost:2340/api/subscribedata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        const data = await res.json();
  
        if (res.ok) {
          alert("subscribe successfully!");
          
  
          setFormData({
          
            email: "",
           
          });
        } else {
          alert(data.message);
        }
  
      } catch (err) {
        console.error(err);
        alert("Error sending message");
      }
    };
  return (
    <div className="about-page">
      
     
      <section className="about-hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>About Us</h1>
          <p>
            Home <span>›</span> About Us
          </p>
        </div>
      </section>

     
      <section className="aboutt-contentt">
        <div className="containerr">
          <h2>About Us</h2>
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga.
          </p>

          <p>
            Et harum quidem rerum facilis est et expedita distinctio. Nam libero
            tempore, cum soluta nobis est eligendi optio cumque nihil impedit
            quo minus id quod maxime placeat facere possimus, omnis voluptas
            assumenda est, omnis dolor repellendus.
          </p>
        </div>
        <div className="ffoter">
          <div className="newsletter-section">
      <div className="newsletter-box" >
        <h2>SUBSCRIBE NEWSLETTER</h2>
        <form onSubmit={handleSubmit}>

        <input type="email" name="email" placeholder="Enter Email Address" onChange={handleChange} value={formData.email}/>

        <button className="subscribe-btn">
          Subscribe <span>➜</span>
        </button>
</form>
        <p>
          *We send great deals and latest auto news to our
          <br />
          subscribed users very week.
        </p>
      </div>
    </div>
         <h1> ABOUT US</h1> 
        </div>
      </section>
    </div>
  );
}