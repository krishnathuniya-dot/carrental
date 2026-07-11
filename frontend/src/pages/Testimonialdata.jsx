
import React, { useState, useEffect } from "react";

export default function Testimonialdata() {
   const [quotes, setQuotes] = useState([]);
 
   const fetchQuotes = async () => {
     try {
       const res = await fetch("http://localhost:2340/api/testiomonaldata");
       const data = await res.json();
       setQuotes(data.data || []);
     } catch (error) {
       console.log("Error fetching subscriber data:", error);
     }
   };
 
   useEffect(() => {
     fetchQuotes();
   }, []);
 
   const deleteQuote = async (id) => {
     const confirmDelete = window.confirm(
       "Are you sure you want to delete this subscriber?"
     );
     if (!confirmDelete) return;
 
     try {
       await fetch(`http://localhost:2340/api/deletetestimonial/${id}`, {
         method: "DELETE",
       });
 
       setQuotes((prevQuotes) =>
         prevQuotes.filter((quote) => quote._id !== id)
       );
     } catch (error) {
       console.error("Error deleting subscriber:", error);
     }
   };
 
   return (
     <div className="manage-container">
       <h2>MANAGE Testimonial</h2>
 
       <table className="mq-tables">
         <thead>
           <tr className="mq-tr">
             <th>#</th>
             <th>name</th>
             <th>Testiomaials</th>
             <th>posting Date</th>
             <th>Action</th>
           </tr>
         </thead>
 
         <tbody>
           {quotes.length > 0 ? (
             quotes.map((q, index) => (
               <tr key={q._id}>
                 <td>{index + 1}</td>
                  <td>{q.name}</td>
                 <td>{q.message}</td>
                 <td>
                   {q.createdAt
                     ? new Date(q.createdAt).toLocaleString()
                     : "N/A"}
                 </td>
                 <td>
                   <button
                     className="delete-btn"
                     onClick={() => deleteQuote(q._id)}
                   >
                     Delete
                   </button>
                 </td>
               </tr>
             ))
           ) : (
             <tr>
               <td colSpan="4" style={{ textAlign: "center" }}>
                 No subscribers found
               </td>
             </tr>
           )}
         </tbody>
       </table>
     </div>
   );
 }
