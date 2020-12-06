import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from 'urql';
import { uploadFormQuery } from '../query';
import {TextInput, Button} from 'carbon-components-react'

export const FormUpload = () => {
  const { action } = useParams<{ action: string }>();
  const [,uploadForm] = useMutation(uploadFormQuery);
  const initialFormState = {
    id: '',
    title: '',
    name: '',
    procedureID: ''
  };
  const initialFileData = {
    fileName: '',
    contents: ''
  }
  const [formToUpdate, setFormToUpdate] = useState<any>(initialFormState);
  const [fileData, setFileData] = useState<any>(initialFileData);
  const handleSubmit = (event: any) => {
    event.preventDefault();

    /*

    // check a form has been entered

    if (formToUpdate.procedureID === initialFormState.procedureID) {
      alert('Please enter a procedure ID');
      return;
    }

    if (fileData.fileName === initialFileData.fileName) {
      alert('Please upload a form');
      return;
    }*/
  
    let clone = { ...formToUpdate };
    clone = {id: formToUpdate.id, input: {id: formToUpdate.id, xml: fileData.contents}};
    setFormToUpdate(clone);
    uploadForm(clone);
    alert(`Form was ${action === "new" ? "uploaded" : "updated"} with title: ${fileData.fileName} and procedure ID: ${formToUpdate.procedureID}`);
    return false;
   /* 
    // reset state of FormUpload
    
    setFormToUpdate(initialFormState);
    setFileData(initialFileData);
    */
  }
  const updateFile = async (event: any) => {

     let fileIn = event.currentTarget.files[0];
     let textPromise = fileIn.text();

     textPromise.then((text: any) => text);

     let content = await fileIn.text();
    setFileData({fileName: fileIn.name, contents:  content});
  }
  const updateprocedureID = (event: any) => {
    let newProcedureID = event.currentTarget.value;
    setFormToUpdate({id: newProcedureID, procedureID: newProcedureID});
  }
  const txtInput = { // make sure all required component's inputs/Props keys&types match
  id:"FormID",
  labelText:"Form ID",
  onChange: updateprocedureID
}
  return (
    <div className="update-form-container">
      <h1>{action === "new" ? "Upload" : "Update"} a Form</h1>
      <form id="FormUpdate" onSubmit={handleSubmit}>
          <TextInput {...txtInput}/>
        <label>
          File:
          <input type="file" onChange={updateFile}/>
        </label>
        <Button type="submit" kind="tertiary">Submit</Button>
      </form>
    </div>
  )
};
