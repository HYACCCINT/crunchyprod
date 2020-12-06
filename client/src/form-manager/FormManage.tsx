import React, {useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'urql';
import { deleteFormQuery } from '../query';
import {TextInput, Button} from 'carbon-components-react';
import {UserContext} from '../common/user-context';
import './FormManage.scss'

export const FormManage = () => {
  const history = useHistory();
  const [, deleteForm] = useMutation(deleteFormQuery);
  const [formID, setFormID] = useState('');
  const handleProcedureIdClick = async (action: any, ...params: any) => {
    // const formId = prompt('Please enter the Form ID');
    if (!validateId(formID)){
      return;
    }
    await action(formID, ...params);
  }

  const displayFormAction = async (formId: string) => {
    history.push('/formdisplay/' + formId);
  } 
  
  const deleteFormAction = async (formId: string) => {
    const result = await deleteForm({ id: formId });
    if (!result.error) alert(`Form ${formId} deleted!`);
    else alert(`Form deletion failed. There is no form for ID ${formId}`);
  }

  const uploadFormAction = async (action: string) => {
    history.push('/upload-form/' + action);
  }
  const txtInputProps = { // make sure all required component's inputs/Props keys&types match
  id:"FormID",
  labelText:"Form ID",
  onChange: (event:any)=>{
    setFormID(event.target.value)
  }
}
  return (
    <div className="App">
    <div className="mainWrap">
      <div className='displayDelete'>
        <TextInput {...txtInputProps}/>
        <Button id="displayButton" kind="tertiary" className="menu-Button" onClick={() => handleProcedureIdClick(displayFormAction)}>Display Form</Button>
        <Button id="deleteButton" kind="danger" className="menu-Button" onClick={() => handleProcedureIdClick(deleteFormAction)}>Delete Form</Button>
      </div>
      <div className='uploadUpdate'>
        <Button id="uploadButton" kind="tertiary" className="menu-Button" onClick={() => uploadFormAction('new')}>Upload Form</Button>
        <Button id="updateButton" kind="tertiary" className="menu-Button" onClick={() => uploadFormAction('update')}>Update Form</Button>
      </div>
      </div>
    </div>
  );
};

function validateId(procedureId: string | null) {
  return procedureId !== null && procedureId !== "";
}