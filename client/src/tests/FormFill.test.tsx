import React from 'react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'urql';
import { makeSubject } from 'wonka';
import { shallow } from 'enzyme';
import { FormFill} from '../form-filler/FormFill';
import { MemoryRouter } from 'react-router-dom';

const { source: stream, next: pushResponse } = makeSubject();

const mockedClient = {
  executeQuery: jest.fn(() => stream),
};

it('displayed procedureId and name matches actual procedureId and name', () => {
  const wrapper = shallow(
    <MemoryRouter initialEntries={['/FormFill/a']}>
    <Provider value={mockedClient}>
      <FormFill />
    </Provider>
    </MemoryRouter>
  );

  act(() => {
    pushResponse({
      data: {
        "id":"a",
        "docType":"SDCForm",
        "procedureID":"US_Thyroid_CCO.359_2.1.2.DRAFT_sdcFDF",
        "patientID":"template",
        "lineage":"US_Thyroid_CCO.359",
        "title":"CCO Synoptic Template for  Thyroid US",
        "uri":"_baseURI=cancercare.on.ca&_lineage=US_Thyroid_CCO.359&_version=2.1.2.DRAFT&_docType=sdcFDF",
        "footer":"Footer.US_Thyroid_CCO.359_1.0.0.DRAFT_sdcFDFundefined",
        "lastModified":null,
        "sections":[
           {
              "id":"a-77732.100004300",
              "docType":"SDCSection",
              "name":null,
              "title":"CLINICAL INFORMATION",
              "type":null,
              "mustImplement":null,
              "minCard":null,
              "maxCard":null,
              "superSectionID":"a",
              "subSections":[
                 
              ],
              "questions":[
                 {
                    "id":"77894.100004300",
                    "docType":"SDCQuestion",
                    "name":"Q_77894",
                    "title":"Clinical History:",
                    "mustImplement":null,
                    "readOnly":null,
                    "minCard":null,
                    "maxCard":null,
                    "maxSelections":null,
                    "questionType":"text",
                    "isEnabled":null,
                    "response":{
                       "id":null,
                       "questionID":null,
                       "responseType":"text",
                       "userInput":"",
                       "defaultText":null,
                       "__typename":"SDCTextResponse"
                    },
                    "textAfterResponse":null,
                    "superSectionID":"a-77732.100004300",
                    "superQuestionID":null,
                    "superAnswerID":null,
                    "subQuestions":[
                       
                    ]
                 },
                 {
                    "id":"77895.100004300",
                    "docType":"SDCQuestion",
                    "name":"Q_77895",
                    "title":"Personal history of thyroid malignancy",
                    "mustImplement":null,
                    "readOnly":null,
                    "minCard":null,
                    "maxCard":null,
                    "maxSelections":null,
                    "questionType":"single choice",
                    "isEnabled":null,
                    "response":{
                       "id":null,
                       "questionID":null,
                       "responseType":"single choice",
                       "choices":[
                          {
                             "name":"LI_77896",
                             "ID":"77896.100004300",
                             "title":"Yes"
                          },
                          {
                             "name":"LI_77897",
                             "ID":"77897.100004300",
                             "title":"No"
                          }
                       ],
                       "canMultiSelect":null,
                       "userInput":"",
                       "__typename":"SDCMultipleChoiceResponse"
                    },
                    "textAfterResponse":null,
                    "superSectionID":"a-77732.100004300",
                    "superQuestionID":null,
                    "superAnswerID":null,
                    "subQuestions":[
                       
                    ]
                 },
                 {
                    "id":"77905.100004300",
                    "docType":"SDCQuestion",
                    "name":"Q_77905",
                    "title":"Prior Biopsy",
                    "mustImplement":null,
                    "readOnly":null,
                    "minCard":null,
                    "maxCard":null,
                    "maxSelections":null,
                    "questionType":"single choice",
                    "isEnabled":null,
                    "response":{
                       "id":null,
                       "questionID":null,
                       "responseType":"single choice",
                       "choices":[
                          {
                             "name":"LI_77906",
                             "ID":"77906.100004300",
                             "title":"Yes:"
                          },
                          {
                             "name":"LI_77907",
                             "ID":"77907.100004300",
                             "title":"No"
                          }
                       ],
                       "canMultiSelect":null,
                       "userInput":"",
                       "__typename":"SDCMultipleChoiceResponse"
                    },
                    "textAfterResponse":null,
                    "superSectionID":"a-77732.100004300",
                    "superQuestionID":null,
                    "superAnswerID":null,
                    "subQuestions":[
                       
                    ]
                 }
              ]
           },
           {
              "id":"a-77753.100004300",
              "docType":"SDCSection",
              "name":null,
              "title":"COMPARISON STUDY",
              "type":null,
              "mustImplement":null,
              "minCard":null,
              "maxCard":null,
              "superSectionID":"a",
              "subSections":[
                 
              ],
              "questions":[
                 {
                    "id":"77898.100004300",
                    "docType":"SDCQuestion",
                    "name":"Q_77898",
                    "title":"Comparison Study:",
                    "mustImplement":null,
                    "readOnly":null,
                    "minCard":null,
                    "maxCard":null,
                    "maxSelections":null,
                    "questionType":"single choice",
                    "isEnabled":null,
                    "response":{
                       "id":null,
                       "questionID":null,
                       "responseType":"single choice",
                       "choices":[
                          {
                             "name":"LI_77899",
                             "ID":"77899.100004300",
                             "title":"Oldest available prior US exam:"
                          },
                          {
                             "name":"LI_77901",
                             "ID":"77901.100004300",
                             "title":"No prior US"
                          },
                          {
                             "name":"LI_77902",
                             "ID":"77902.100004300",
                             "title":"Other modality"
                          }
                       ],
                       "canMultiSelect":null,
                       "userInput":"",
                       "__typename":"SDCMultipleChoiceResponse"
                    },
                    "textAfterResponse":null,
                    "superSectionID":"a-77753.100004300",
                    "superQuestionID":null,
                    "superAnswerID":null,
                    "subQuestions":[
                       
                    ]
                 }
              ]
           },
           {
              "id":"a-77663.100004300",
              "docType":"SDCSection",
              "name":null,
              "title":"PROCEDURE/TECHNICAL NOTE",
              "type":null,
              "mustImplement":null,
              "minCard":null,
              "maxCard":null,
              "superSectionID":"a",
              "subSections":[
                 
              ],
              "questions":[
                 {
                    "id":"77909.100004300",
                    "docType":"SDCQuestion",
                    "name":"Q_77909",
                    "title":"Technical Quality:",
                    "mustImplement":null,
                    "readOnly":null,
                    "minCard":null,
                    "maxCard":null,
                    "maxSelections":null,
                    "questionType":"single choice",
                    "isEnabled":null,
                    "response":{
                       "id":null,
                       "questionID":null,
                       "responseType":"single choice",
                       "choices":[
                          {
                             "name":"LI_77910",
                             "ID":"77910.100004300",
                             "title":"Satisfactory"
                          },
                          {
                             "name":"LI_77911",
                             "ID":"77911.100004300",
                             "title":" Limited due to:"
                          }
                       ],
                       "canMultiSelect":null,
                       "userInput":"",
                       "__typename":"SDCMultipleChoiceResponse"
                    },
                    "textAfterResponse":null,
                    "superSectionID":"a-77663.100004300",
                    "superQuestionID":null,
                    "superAnswerID":null,
                    "subQuestions":[
                       
                    ]
                 }
              ]
           },
           {
              "id":"a-77740.100004300",
              "docType":"SDCSection",
              "name":null,
              "title":"FINDINGS",
              "type":null,
              "mustImplement":null,
              "minCard":null,
              "maxCard":null,
              "superSectionID":"a",
              "subSections":[
                 {
                    "id":"a-77740.100004300-77966.100004300",
                    "docType":"SDCSection",
                    "name":null,
                    "title":"1. Thyroid Gland",
                    "type":null,
                    "mustImplement":null,
                    "minCard":null,
                    "maxCard":null,
                    "superSectionID":"a-77740.100004300",
                    "subSections":[
                       
                    ],
                    "questions":[
                       {
                          "id":"77978.100004300",
                          "docType":"SDCQuestion",
                          "name":"Q_77978",
                          "title":"A. Right Lobe:",
                          "mustImplement":null,
                          "readOnly":null,
                          "minCard":null,
                          "maxCard":null,
                          "maxSelections":null,
                          "questionType":"single choice",
                          "isEnabled":null,
                          "response":{
                             "id":null,
                             "questionID":null,
                             "responseType":"single choice",
                             "choices":[
                                
                             ],
                             "canMultiSelect":null,
                             "userInput":"",
                             "__typename":"SDCMultipleChoiceResponse"
                          },
                          "textAfterResponse":null,
                          "superSectionID":"a-77740.100004300-77966.100004300",
                          "superQuestionID":null,
                          "superAnswerID":null,
                          "subQuestions":[
                             
                          ]
                       },
                       {
                          "id":"77979.100004300",
                          "docType":"SDCQuestion",
                          "name":"Q_77979",
                          "title":"B. Left Lobe:",
                          "mustImplement":null,
                          "readOnly":null,
                          "minCard":null,
                          "maxCard":null,
                          "maxSelections":null,
                          "questionType":"single choice",
                          "isEnabled":null,
                          "response":{
                             "id":null,
                             "questionID":null,
                             "responseType":"single choice",
                             "choices":[
                                
                             ],
                             "canMultiSelect":null,
                             "userInput":"",
                             "__typename":"SDCMultipleChoiceResponse"
                          },
                          "textAfterResponse":null,
                          "superSectionID":"a-77740.100004300-77966.100004300",
                          "superQuestionID":null,
                          "superAnswerID":null,
                          "subQuestions":[
                             
                          ]
                       },
                       {
                          "id":"77980.100004300",
                          "docType":"SDCQuestion",
                          "name":"Q_77980",
                          "title":"C.\tDoppler Flow Whole Gland:",
                          "mustImplement":null,
                          "readOnly":null,
                          "minCard":null,
                          "maxCard":null,
                          "maxSelections":null,
                          "questionType":"single choice",
                          "isEnabled":null,
                          "response":{
                             "id":null,
                             "questionID":null,
                             "responseType":"single choice",
                             "choices":[
                                {
                                   "name":"LI_77988",
                                   "ID":"77988.100004300",
                                   "title":"normal"
                                },
                                {
                                   "name":"LI_77986",
                                   "ID":"77986.100004300",
                                   "title":"increased"
                                },
                                {
                                   "name":"LI_77987",
                                   "ID":"77987.100004300",
                                   "title":"decreased"
                                }
                             ],
                             "canMultiSelect":null,
                             "userInput":"",
                             "__typename":"SDCMultipleChoiceResponse"
                          },
                          "textAfterResponse":null,
                          "superSectionID":"a-77740.100004300-77966.100004300",
                          "superQuestionID":null,
                          "superAnswerID":null,
                          "subQuestions":[
                             
                          ]
                       },
                       {
                          "id":"77976.100004300",
                          "docType":"SDCQuestion",
                          "name":"Q_77976",
                          "title":"D. Thyroid Echotexture:",
                          "mustImplement":null,
                          "readOnly":null,
                          "minCard":null,
                          "maxCard":null,
                          "maxSelections":null,
                          "questionType":"single choice",
                          "isEnabled":null,
                          "response":{
                             "id":null,
                             "questionID":null,
                             "responseType":"single choice",
                             "choices":[
                                {
                                   "name":"LI_77982",
                                   "ID":"77982.100004300",
                                   "title":"Parenchymal echogenicity is uniform.  No significant nodule."
                                },
                                {
                                   "name":"LI_77983",
                                   "ID":"77983.100004300",
                                   "title":"Subtle lobulation of outline and parenchymal heterogeneity without distinct nodules."
                                },
                                {
                                   "name":"LI_77984",
                                   "ID":"77984.100004300",
                                   "title":"Parenchymal heterogeneity with numerous small hypoechoic nodules, consistent with Hashimotos (lymphocytic) thyroiditis"
                                },
                                {
                                   "name":"LI_77981",
                                   "ID":"77981.100004300",
                                   "title":"No suspicious nodules warranting follow up or biopsy."
                                },
                                {
                                   "name":"LI_77985",
                                   "ID":"77985.100004300",
                                   "title":"Nodules warranting assessment, described below."
                                }
                             ],
                             "canMultiSelect":null,
                             "userInput":"",
                             "__typename":"SDCMultipleChoiceResponse"
                          },
                          "textAfterResponse":null,
                          "superSectionID":"a-77740.100004300-77966.100004300",
                          "superQuestionID":null,
                          "superAnswerID":null,
                          "subQuestions":[
                             
                          ]
                       }
                    ]
                 },
                 {
                    "id":"a-77740.100004300-77967.100004300",
                    "docType":"SDCSection",
                    "name":null,
                    "title":"2. Nodules  (Erase this section if no nodules to assess):",
                    "type":null,
                    "mustImplement":null,
                    "minCard":null,
                    "maxCard":null,
                    "superSectionID":"a-77740.100004300",
                    "subSections":[
                       {
                          "id":"a-77740.100004300-77967.100004300-78013.100004300",
                          "docType":"SDCSection",
                          "name":null,
                          "title":"B.Nodule:",
                          "type":null,
                          "mustImplement":null,
                          "minCard":null,
                          "maxCard":null,
                          "superSectionID":"a-77740.100004300-77967.100004300",
                          "subSections":[
                             
                          ],
                          "questions":[
                             {
                                "id":"78013.100004300",
                                "docType":"SDCQuestion",
                                "name":"Q_78013",
                                "title":"B. Nodule [Repeating section lablel: L1, L2, L3, R1, R2, and/or R3]",
                                "mustImplement":null,
                                "readOnly":null,
                                "minCard":null,
                                "maxCard":null,
                                "maxSelections":null,
                                "questionType":"text",
                                "isEnabled":null,
                                "response":{
                                   "id":null,
                                   "questionID":null,
                                   "responseType":"text",
                                   "userInput":"",
                                   "defaultText":null,
                                   "__typename":"SDCTextResponse"
                                },
                                "textAfterResponse":null,
                                "superSectionID":"a-77740.100004300-77967.100004300-78013.100004300",
                                "superQuestionID":null,
                                "superAnswerID":null,
                                "subQuestions":[
                                   
                                ]
                             }
                          ]
                       }
                    ],
                    "questions":[
                       {
                          "id":"78005.100004300",
                          "docType":"SDCQuestion",
                          "name":"Q_78005",
                          "title":"A. Estimated total number of nodules > and or = 1 cm:",
                          "mustImplement":null,
                          "readOnly":null,
                          "minCard":null,
                          "maxCard":null,
                          "maxSelections":null,
                          "questionType":"single choice",
                          "isEnabled":null,
                          "response":{
                             "id":null,
                             "questionID":null,
                             "responseType":"single choice",
                             "choices":[
                                {
                                   "name":"LI_78006",
                                   "ID":"78006.100004300",
                                   "title":"1"
                                },
                                {
                                   "name":"LI_78007",
                                   "ID":"78007.100004300",
                                   "title":"2"
                                },
                                {
                                   "name":"LI_78008",
                                   "ID":"78008.100004300",
                                   "title":"3"
                                },
                                {
                                   "name":"LI_78009",
                                   "ID":"78009.100004300",
                                   "title":"4"
                                },
                                {
                                   "name":"LI_78010",
                                   "ID":"78010.100004300",
                                   "title":"5"
                                },
                                {
                                   "name":"LI_78011",
                                   "ID":"78011.100004300",
                                   "title":"6 - 10"
                                },
                                {
                                   "name":"LI_78012",
                                   "ID":"78012.100004300",
                                   "title":">10"
                                }
                             ],
                             "canMultiSelect":null,
                             "userInput":"",
                             "__typename":"SDCMultipleChoiceResponse"
                          },
                          "textAfterResponse":null,
                          "superSectionID":"a-77740.100004300-77967.100004300",
                          "superQuestionID":null,
                          "superAnswerID":null,
                          "subQuestions":[
                             
                          ]
                       }
                    ]
                 },
                 {
                    "id":"a-77740.100004300-77739.100004300",
                    "docType":"SDCSection",
                    "name":null,
                    "title":"3. LYMPH NODES",
                    "type":null,
                    "mustImplement":null,
                    "minCard":null,
                    "maxCard":null,
                    "superSectionID":"a-77740.100004300",
                    "subSections":[
                       
                    ],
                    "questions":[
                       {
                          "id":"77968.100004300",
                          "docType":"SDCQuestion",
                          "name":"Q_77968",
                          "title":"A.\tLevels evaluated:",
                          "mustImplement":null,
                          "readOnly":null,
                          "minCard":null,
                          "maxCard":null,
                          "maxSelections":null,
                          "questionType":"single choice",
                          "isEnabled":null,
                          "response":{
                             "id":null,
                             "questionID":null,
                             "responseType":"single choice",
                             "choices":[
                                {
                                   "name":"LI_77969",
                                   "ID":"77969.100004300",
                                   "title":"Levels 2 - 4 (lateral) and 6 (central)"
                                },
                                {
                                   "name":"LI_77970",
                                   "ID":"77970.100004300",
                                   "title":"Other"
                                }
                             ],
                             "canMultiSelect":null,
                             "userInput":"",
                             "__typename":"SDCMultipleChoiceResponse"
                          },
                          "textAfterResponse":null,
                          "superSectionID":"a-77740.100004300-77739.100004300",
                          "superQuestionID":null,
                          "superAnswerID":null,
                          "subQuestions":[
                             {
                                "id":"77971.100004300",
                                "docType":"SDCQuestion",
                                "name":"Q_77971",
                                "title":"[Enter text]",
                                "mustImplement":null,
                                "readOnly":null,
                                "minCard":null,
                                "maxCard":null,
                                "maxSelections":null,
                                "questionType":"text",
                                "isEnabled":null,
                                "response":{
                                   "id":null,
                                   "questionID":null,
                                   "responseType":"text",
                                   "userInput":"",
                                   "defaultText":null,
                                   "__typename":"SDCTextResponse"
                                },
                                "textAfterResponse":null,
                                "superSectionID":null,
                                "superQuestionID":"77968.100004300",
                                "superAnswerID":"77970.100004300"
                             }
                          ]
                       },
                       {
                          "id":"77728.100004300",
                          "docType":"SDCQuestion",
                          "name":"Q_LN_Status_77728",
                          "title":"B. Suspicious lymph nodes: ",
                          "mustImplement":null,
                          "readOnly":null,
                          "minCard":null,
                          "maxCard":null,
                          "maxSelections":null,
                          "questionType":"single choice",
                          "isEnabled":null,
                          "response":{
                             "id":null,
                             "questionID":null,
                             "responseType":"single choice",
                             "choices":[
                                {
                                   "name":"LI_77972",
                                   "ID":"77972.100004300",
                                   "title":"No"
                                },
                                {
                                   "name":"LI_77973",
                                   "ID":"77973.100004300",
                                   "title":"Yes"
                                }
                             ],
                             "canMultiSelect":null,
                             "userInput":"",
                             "__typename":"SDCMultipleChoiceResponse"
                          },
                          "textAfterResponse":null,
                          "superSectionID":"a-77740.100004300-77739.100004300",
                          "superQuestionID":null,
                          "superAnswerID":null,
                          "subQuestions":[
                             {
                                "id":"77974.100004300",
                                "docType":"SDCQuestion",
                                "name":"Q_77974",
                                "title":"location: [Enter text]",
                                "mustImplement":null,
                                "readOnly":null,
                                "minCard":null,
                                "maxCard":null,
                                "maxSelections":null,
                                "questionType":"text",
                                "isEnabled":null,
                                "response":{
                                   "id":null,
                                   "questionID":null,
                                   "responseType":"text",
                                   "userInput":"",
                                   "defaultText":null,
                                   "__typename":"SDCTextResponse"
                                },
                                "textAfterResponse":null,
                                "superSectionID":null,
                                "superQuestionID":"77728.100004300",
                                "superAnswerID":"77973.100004300"
                             },
                             {
                                "id":"77975.100004300",
                                "docType":"SDCQuestion",
                                "name":"Q_77975",
                                "title":"short axis size: (cm)",
                                "mustImplement":null,
                                "readOnly":null,
                                "minCard":null,
                                "maxCard":null,
                                "maxSelections":null,
                                "questionType":"text",
                                "isEnabled":null,
                                "response":{
                                   "id":null,
                                   "questionID":null,
                                   "responseType":"text",
                                   "userInput":"",
                                   "defaultText":null,
                                   "__typename":"SDCTextResponse"
                                },
                                "textAfterResponse":null,
                                "superSectionID":null,
                                "superQuestionID":"77728.100004300",
                                "superAnswerID":"77973.100004300"
                             }
                          ]
                       }
                    ]
                 }
              ],
              "questions":[
                 
              ]
           },
           {
              "id":"a-77727.100004300",
              "docType":"SDCSection",
              "name":null,
              "title":"OTHER",
              "type":null,
              "mustImplement":null,
              "minCard":null,
              "maxCard":null,
              "superSectionID":"a",
              "subSections":[
                 
              ],
              "questions":[
                 {
                    "id":"78175.100004300",
                    "docType":"SDCQuestion",
                    "name":"Q_78175",
                    "title":"Other comments:",
                    "mustImplement":null,
                    "readOnly":null,
                    "minCard":null,
                    "maxCard":null,
                    "maxSelections":null,
                    "questionType":"text",
                    "isEnabled":null,
                    "response":{
                       "id":null,
                       "questionID":null,
                       "responseType":"text",
                       "userInput":"",
                       "defaultText":null,
                       "__typename":"SDCTextResponse"
                    },
                    "textAfterResponse":null,
                    "superSectionID":"a-77727.100004300",
                    "superQuestionID":null,
                    "superAnswerID":null,
                    "subQuestions":[
                       
                    ]
                 }
              ]
           },
           {
              "id":"a-78071.100004300",
              "docType":"SDCSection",
              "name":null,
              "title":"IMPRESSION",
              "type":null,
              "mustImplement":null,
              "minCard":null,
              "maxCard":null,
              "superSectionID":"a",
              "subSections":[
                 
              ],
              "questions":[
                 {
                    "id":"77689.100004300",
                    "docType":"SDCQuestion",
                    "name":"Q_Oth_77689",
                    "title":"A.\t  Pick one of the following if no follow up required or leave blank if follow up is required:",
                    "mustImplement":null,
                    "readOnly":null,
                    "minCard":null,
                    "maxCard":null,
                    "maxSelections":null,
                    "questionType":"single choice",
                    "isEnabled":null,
                    "response":{
                       "id":null,
                       "questionID":null,
                       "responseType":"single choice",
                       "choices":[
                          {
                             "name":"LI_78072",
                             "ID":"78072.100004300",
                             "title":"Normal thyroid sonogram. No imaging follow up is recommended unless clinically indicated. "
                          },
                          {
                             "name":"LI_78073",
                             "ID":"78073.100004300",
                             "title":"Small thyroid nodules with convincingly benign features. No imaging follow up is recommended unless clinically indicated."
                          },
                          {
                             "name":"LI_78074",
                             "ID":"78074.100004300",
                             "title":"Consistent with Hashimoto's (lymphocytic) thyroiditis. No suspicious nodule.  No imaging follow up is recommended unless clinically indicated."
                          },
                          {
                             "name":"LI_78075",
                             "ID":"78075.100004300",
                             "title":"Nodules show stability over at least 5 years.  No further follow up recommended unless clinically indicated."
                          }
                       ],
                       "canMultiSelect":null,
                       "userInput":"",
                       "__typename":"SDCMultipleChoiceResponse"
                    },
                    "textAfterResponse":null,
                    "superSectionID":"a-78071.100004300",
                    "superQuestionID":null,
                    "superAnswerID":null,
                    "subQuestions":[
                       
                    ]
                 },
                 {
                    "id":"78076.100004300",
                    "docType":"SDCQuestion",
                    "name":"Q_78076",
                    "title":"B.   US guided FNA should be considered for nodule(s):",
                    "mustImplement":null,
                    "readOnly":null,
                    "minCard":null,
                    "maxCard":null,
                    "maxSelections":null,
                    "questionType":"text",
                    "isEnabled":null,
                    "response":{
                       "id":null,
                       "questionID":null,
                       "responseType":"text",
                       "userInput":"",
                       "defaultText":null,
                       "__typename":"SDCTextResponse"
                    },
                    "textAfterResponse":null,
                    "superSectionID":"a-78071.100004300",
                    "superQuestionID":null,
                    "superAnswerID":null,
                    "subQuestions":[
                       {
                          "id":"77971.100004300",
                          "docType":"SDCQuestion",
                          "name":"Q_dmk10",
                          "title":"[Enter text]",
                          "mustImplement":null,
                          "readOnly":null,
                          "minCard":null,
                          "maxCard":null,
                          "maxSelections":null,
                          "questionType":"text",
                          "isEnabled":null,
                          "response":{
                             "id":null,
                             "questionID":null,
                             "responseType":"text",
                             "userInput":"",
                             "defaultText":null,
                             "__typename":"SDCTextResponse"
                          },
                          "textAfterResponse":null,
                          "superSectionID":null,
                          "superQuestionID":"78076.100004300",
                          "superAnswerID":"78073.100004300"
                       }
                    ]
                 },
                 {
                    "id":"78076.100004300",
                    "docType":"SDCQuestion",
                    "name":"Q_dmk1",
                    "title":"C.\tAnnual follow up US recommended until stability over 5 years has been demonstrated for the following nodule(s):",
                    "mustImplement":null,
                    "readOnly":null,
                    "minCard":null,
                    "maxCard":null,
                    "maxSelections":null,
                    "questionType":"text",
                    "isEnabled":null,
                    "response":{
                       "id":null,
                       "questionID":null,
                       "responseType":"text",
                       "userInput":"",
                       "defaultText":null,
                       "__typename":"SDCTextResponse"
                    },
                    "textAfterResponse":null,
                    "superSectionID":"a-78071.100004300",
                    "superQuestionID":null,
                    "superAnswerID":null,
                    "subQuestions":[
                       {
                          "id":"77971.100004300",
                          "docType":"SDCQuestion",
                          "name":"Q_dmk10",
                          "title":"[Enter text]",
                          "mustImplement":null,
                          "readOnly":null,
                          "minCard":null,
                          "maxCard":null,
                          "maxSelections":null,
                          "questionType":"text",
                          "isEnabled":null,
                          "response":{
                             "id":null,
                             "questionID":null,
                             "responseType":"text",
                             "userInput":"",
                             "defaultText":null,
                             "__typename":"SDCTextResponse"
                          },
                          "textAfterResponse":null,
                          "superSectionID":null,
                          "superQuestionID":"78076.100004300",
                          "superAnswerID":"78073.100004300"
                       }
                    ]
                 },
                 {
                    "id":"78076.100004300",
                    "docType":"SDCQuestion",
                    "name":"Q_dmk2",
                    "title":"D.\t  Adenopathy:",
                    "mustImplement":null,
                    "readOnly":null,
                    "minCard":null,
                    "maxCard":null,
                    "maxSelections":null,
                    "questionType":"single choice",
                    "isEnabled":null,
                    "response":{
                       "id":null,
                       "questionID":null,
                       "responseType":"single choice",
                       "choices":[
                          {
                             "name":"LI_dmk1",
                             "ID":"78072.100004300",
                             "title":"None"
                          },
                          {
                             "name":"LI_dmk2",
                             "ID":"78073.100004300",
                             "title":"Yes"
                          }
                       ],
                       "canMultiSelect":null,
                       "userInput":"",
                       "__typename":"SDCMultipleChoiceResponse"
                    },
                    "textAfterResponse":null,
                    "superSectionID":"a-78071.100004300",
                    "superQuestionID":null,
                    "superAnswerID":null,
                    "subQuestions":[
                       {
                          "id":"77971.100004300",
                          "docType":"SDCQuestion",
                          "name":"Q_dmk10",
                          "title":"[Enter text]",
                          "mustImplement":null,
                          "readOnly":null,
                          "minCard":null,
                          "maxCard":null,
                          "maxSelections":null,
                          "questionType":"text",
                          "isEnabled":null,
                          "response":{
                             "id":null,
                             "questionID":null,
                             "responseType":"text",
                             "userInput":"",
                             "defaultText":null,
                             "__typename":"SDCTextResponse"
                          },
                          "textAfterResponse":null,
                          "superSectionID":null,
                          "superQuestionID":"78076.100004300",
                          "superAnswerID":"78073.100004300"
                       }
                    ]
                 },
                 {
                    "id":"78076.100004300",
                    "docType":"SDCQuestion",
                    "name":"Q_dmk4",
                    "title":"E.\t  Other:",
                    "mustImplement":null,
                    "readOnly":null,
                    "minCard":null,
                    "maxCard":null,
                    "maxSelections":null,
                    "questionType":"text",
                    "isEnabled":null,
                    "response":{
                       "id":null,
                       "questionID":null,
                       "responseType":"text",
                       "userInput":"",
                       "defaultText":null,
                       "__typename":"SDCTextResponse"
                    },
                    "textAfterResponse":null,
                    "superSectionID":"a-78071.100004300",
                    "superQuestionID":null,
                    "superAnswerID":null,
                    "subQuestions":[
                       {
                          "id":"77971.100004300",
                          "docType":"SDCQuestion",
                          "name":"Q_dmk10",
                          "title":"[Enter text]",
                          "mustImplement":null,
                          "readOnly":null,
                          "minCard":null,
                          "maxCard":null,
                          "maxSelections":null,
                          "questionType":"text",
                          "isEnabled":null,
                          "response":{
                             "id":null,
                             "questionID":null,
                             "responseType":"text",
                             "userInput":"",
                             "defaultText":null,
                             "__typename":"SDCTextResponse"
                          },
                          "textAfterResponse":null,
                          "superSectionID":null,
                          "superQuestionID":"78076.100004300",
                          "superAnswerID":"78073.100004300"
                       }
                    ]
                 }
              ]
           }
        ]
     },
    });
  });
  expect(wrapper.text().includes('US_Thyroid_CCO.359_2.1.2.DRAFT_sdcFDF'));
  expect(wrapper.text().includes('E.\t  Other:'));
  expect(wrapper.text().includes('US_Thyroid_CCO.359'));
  expect(wrapper.text().includes('Section : CLINICAL INFORMATION'));
  expect(wrapper.text().includes('Clinical History:'));
  expect(wrapper.text().includes('Personal history of thyroid malignancy'));
  expect(wrapper.text().includes('Prior Biopsy'));
  expect(wrapper.text().includes('Yes'));
  expect(wrapper.text().includes('No'));
  expect(wrapper.text().includes('Section : COMPARISON STUDY'));
  expect(wrapper.text().includes('Comparison Study:'));
  expect(wrapper.text().includes('Oldest available prior US exam:'));
  expect(wrapper.text().includes('Other modality'));
  expect(wrapper.text().includes('Section : PROCEDURE/TECHNICAL NOTE'));
  expect(wrapper.text().includes('Technical Quality:'));
  expect(wrapper.text().includes('Section : FINDINGS'));
  expect(wrapper.text().includes('Section : 1. Thyroid Gland'));
  expect(wrapper.text().includes('A. Right Lobe:'));
  expect(wrapper.text().includes('B. Left Lobe:'));
  expect(wrapper.text().includes('C. Doppler Flow Whole Gland:'));
  expect(wrapper.text().includes('Parenchymal echogenicity is uniform. No significant nodule.'));
  expect(wrapper.text().includes('B. Nodule [Repeating section lablel: L1, L2, L3, R1, R2, and/or R3]'));
  expect(wrapper.text().includes('Levels 2 - 4 (lateral) and 6 (central)'));
  expect(wrapper.text().includes('B. US guided FNA should be considered for nodule(s):'));
  expect(wrapper.text().includes('Section : IMPRESSION'));

  

});
