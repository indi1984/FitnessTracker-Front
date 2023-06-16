// import React, { useState } from "react";
// import { postMessage } from "../ajax-requests";

// const SendMessage = ({ currentPost, token }) => {
//   const post = currentPost;
//   const id = post._id;

//   const [message, setMessage] = useState("");
//   const [success, setSuccess] = useState(false);

//   async function handleSubmit(event) {
//     event.preventDefault();

//     const results = await postMessage(id, token, message);

//     if (results.success) {
//       // success message, clear input
//       alert("Message sent successfully!")
//       setMessage("")
//       setSuccess(true);
//     }
//   }

//   return (
//     <section>
//       {token
//         ? <div
//             key={post._id}
//             className="post"
//           >
//             { post.title ? <h2>{ post.title }</h2> : <h3>MISSING INFO</h3>}
//             { post.description ? <p>{post.description}</p> : null}
//             { post.price ? <h4>Price: {post.price}</h4> : null}
//             { <h4>Seller: {post.author.username}</h4>}
//             { <h4>Location: {post.location}</h4>}
//             <form onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 placeholder="Enter Message*"
//                 value={message}
//                 onChange={(event) => {setMessage(event.target.value)}}
//               />
//               <button type="submit">Send Message</button>
//             </form>
//             {success ? <h3 id="success">Message sent successfully!</h3> : null}
//           </div>
//         : <h1 id="errorMessage">You must be logged in to send the Seller a message!</h1>
//       }
//     </section>
//   )
// }

// export default SendMessage;