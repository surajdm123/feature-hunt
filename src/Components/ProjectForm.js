import React, { useState } from 'react';
import styled from "styled-components";
import Service from "../Service";

const Styles = styled.div`
 background: #218888;
 padding: 20px;

 h3 {
   border-bottom: 1px solid white;
   color: #6f6f6f;
   font-family: sans-serif;
   font-size: 20px;
   font-weight: 600;
   line-height: 24px;
   padding: 10px;
   text-align: center;
 }

 form {
   background: white;
   border: 1px solid #dedede;
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   margin: 0 auto;
   max-width: 500px;
   padding: 50px 200px;
 }

 input {
   border: 1px solid #d9d9d9;
   border-radius: 4px;
   box-sizing: border-box;
   padding: 10px;
   width: 100%;
 }

 label {
   color: #6f6f6f;
   display: block;
   font-family: sans-serif;
   font-size: 14px;
   font-weight: 500;
   margin-bottom: 5px;
 }

 .error {
   color: red;
   font-family: sans-serif;
   font-size: 12px;
   height: 30px;
 }

 .submitButton {
   background-color: #6f6f6f;
   color: white;
   font-family: sans-serif;
   font-size: 14px;
   margin: 20px 0px;
`;

function ProjectForm() {
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [imageURL, setImageURL] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const handleImageURLChange = (e) => {
    setImageURL(e.target.value);
  }
  const handleSubmit = event => {
    const form = new FormData();
    form.append("name", name);
    form.append("description", description);
    form.append("imageURL", imageURL);
    Service.post('addProduct', form)
      .then(data =>
        {setMessage(data.message);
          console.log(data.code);
          if (data.code > 200) {
            console.log(message)
          } else {
            handleClose();
          }
        }).catch(function(err){
          setMessage("There was a problem with your registration. Please try again later.")
      });
   }

  return (
    <div className="container">
      <div className="child">
        <div className="product-title">

        </div>
      </div>
          <form onSubmit={handleSubmit}>
               <h3>PROJECT FORM</h3>
            <fieldset>
              <label>Name</label>
                <TextField
                  id="name"
                  label="name"
                  multiline
                  maxRows={1}
                  value={value}
                  onChange={handleNameChange}
                />
              <label>Description</label>
                <TextField
                  id="description"
                  label="description"
                  multiline
                  maxRows={5}
                  value={value}
                  onChange={handleDescriptionChange}
                />
                <label>Image URL</label>
                <TextField
                  id="imageURL"
                  label="imageURL"
                  multiline
                  maxRows={1}
                  value={value}
                  onChange={handleImageURLChange()}
                />
            </fieldset>
            <button type="submit">Submit</button>
          </form>
    </div>
  );
}

export default function ProjectSubmittal() {
    return (
        <Styles>
            <ProjectForm/>
        </Styles>
    );
}