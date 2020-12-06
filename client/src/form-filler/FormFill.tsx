import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'urql'
import { formQuery, updateResQuery } from '../query'
import {SDCQuestion} from './SDCQuestion'
import {Button, Form, TextInput} from 'carbon-components-react'
import "./FormFill.scss"
export const FormFill = () => {
  const { formID } = useParams<{ formID: string }>();
  const [patientID, setPatientID] = useState<any>(0)
  const [,uploadRes] = useMutation(updateResQuery);

  const [formArray, setFormArray] = useState<any>([]);
  const [formVars] = useState<any>({ id: formID })
  const [formObj,] = useQuery({
    query: formQuery,
    variables: formVars
  })
  const { data, fetching, error } = formObj;
  if (fetching) return (<p>Loading...</p>);

  if (formArray.length == 0) {
    data.form.map((item:any) => {
      delete item.__typename;
      formArray.push(item);
    })
  }
  const renderSections = (sections: any) => {
    if (!sections){
      return null;
    }
    return (
      <div className='sectionWrap'>
        {sections.map((section: any) => {
          if (section === null) return null;
          return (
            <div>
              <p className="sectionTitle">Section {section.name}: {section.title}</p>
              {section.mustImplement ? <p>* Must Complete this section</p> : null}
              {renderQuestions(section.questions)}
              {renderSections(section.subSections)}
            </div>
          )
        })}
      </div>
    )
  }


  const renderQuestions = (questions: any) => {
    return (
      <div>
        {questions.map((question: any) => {
          return <div> 
            <SDCQuestion  questionID={question.id} formArray={formArray} setFormArray={setFormArray}/>
            {question.subQuestions? renderQuestions(question.subQuestions):null}
          </div>
        })}
      </div>
    )
  }
  const renderProperties = (data: any, arbitraryProperties: any) => {
    return (
      <div className="fillerProperties">
        <h5>Title: {data.title}</h5>
        <h6>Version: {data.lastModified}</h6>
        {/*<h5>Release Date: {(new Date(data.releaseDate)).toLocaleString()}</h5>*/}
        <h6>Lineage: {data.lineage}</h6>
        {data.patientID !== "template" ? <h5>Patient: {data.patientID}</h5> : null}
        {arbitraryProperties ? arbitraryProperties.map((item: any) => {
          return item ? <div className="arbitraryFormProperties">{
            Object.entries(item).map((entry: any) => <h6 className="arbitraryFormProperty">{JSON.stringify(entry[0])}: {JSON.stringify(entry[1])}</h6>)
          }</div> : ""
        }) : ""}
      </div>
    )
  }
  
  const assemble = (data: any): any => {
    if(!data) return {};
    let { sectionIDs, ...form} = data[0];
    form.sections = [];
    sectionIDs.forEach((sectionId: string) => form.sections.push(assembleSection(sectionId, data)));
    return form;
  }
  
  const assembleSection = (sectionId: string, data: any): any => {
    const sectionObj = data.find((item: any) => item.docType === "SDCSection" && item.id === sectionId);
    let {subSectionIDs, ...section} = sectionObj;
    section.subSections = [];
    subSectionIDs.forEach((id: string) => section.subSections.push(assembleSection(id, data)));
    let questions = data.filter((item: any) => item.docType === "SDCQuestion" && item.superSectionID === sectionId);
    section.questions = [];
    questions.forEach((question: any) => section.questions.push(assembleQuestions(question, data)));
    return section;
  }
  
  const assembleQuestions = (question: any, data: any): any => {
    const subQuestions = data.filter((item: any) => item.docType === "SDCQuestion" && item.superQuestionID === question.id);
    question.subQuestions = subQuestions;
    return question;
  }
  const response = assemble(formArray);
  const textProps = {
    id: 'patientID',
    labelText: 'Patient ID',
    onChange : (event:any)=>{
      setPatientID(event.target.value)
      formArray.find((item: any) => item.docType === "SDCForm").patientID = event.target.value;
    },
    helperText: 'Enter Patient ID',
    value: formArray.find((item: any) => item.docType === "SDCForm").patientID === "template" ? "" : formArray.find((item: any) => item.docType === "SDCForm").patientID,
}
const formSubmit = () => {
  let submitFlag = 0;

  if(patientID == '')
  {
    alert(`Please enter the Patient ID`);
    submitFlag = 1;
  }
  else submitFlag = 0;

  outer_loop:
  for(let item of formArray)
  {
    if(item.docType === "SDCQuestion")
    {
      if(item.mustImplement !== false && item.isEnabled !== false)
      {
        if(item.questionType === "text")
        {
          if(item.response.userInput === "")
          {
            alert(`Please fill in the answer for Question: ${(item.title).slice(0, -1)}`);
            submitFlag = 1;
            break outer_loop;
          }
          else submitFlag = 0;
        }
        else if(item.questionType === "single choice")
        {
          if(item.response.userInput.length == 0)
          {
            alert(`Please fill in the answer for Question: ${(item.title).slice(0, -1)}`);
            submitFlag = 1;
            break outer_loop;
          }
          else submitFlag = 0;
        }
        else
        {
          if(item.response === null) //item.response.userInput === null after bug input fix
          {
            alert(`Please fill in the answer for Question: ${(item.title).slice(0, -1)}`);
            submitFlag = 1;
            break outer_loop;
          }
          else submitFlag = 0;
        }
      }
    }
  }
  
  if(submitFlag === 0)
  {
    const time = Date.now()
    const responseID = `${response.id}-${patientID}-${time.toString()}`
    response.id = responseID;
    uploadRes({id: responseID, input: formArray});
    console.log("This is the response: ", formArray);
  }
}
  return (
    <div className="fillerWrap">
    <div className="fillerHead">
      <h3>{response.formID}</h3>
      <h3>{response.name}</h3>
      {renderProperties(response, response.arbitraryProperties)}
      <TextInput {...textProps}/>
    </div>
      <Form onSubmit={formSubmit} className="fillerForm">
      <br></br>
      {renderSections(response.sections)}
      <br></br>
      <Button onClick={formSubmit}>Submit</Button>
      </Form>
      <p className="footer">Footer: {(response.footer)}</p>
    </div>
  )
};

