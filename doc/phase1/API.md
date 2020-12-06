Simple Api for SDC\_Form\_Manager
=================================

Version: 1.0.0

BasePath:/crunchycoders9/SDC\_Form\_Manager/1.0.0

Apache 2.0

http://www.apache.org/licenses/LICENSE-2.0.html

Swagger
https://app.swaggerhub.com/apis/crunchycoders9/SDC_Form_Manager/1.0.0

Methods
-------

#### [Developers]
*   [`post /graphQL`]
*   [`delete /graphQL`]

#### [Default]
*   [`get /graphQL`]


======
### Developers
======


## `post /graphQL`

* Updates a document to the database

##### `Consumes`

This API call consumes the following media types via the Content-Type request header:

*   `application/json`

##### `Request body`

body : [SDCForm/SDCQuestion/SDCSection]

Body Parameter — Document object to mutate/update

## Responses

##### `200/204`

* document successfully updated

##### `400`

* invalid request, request rejected by backend/database

##### `500`

* could not find server/database

======

## `delete /graphQL`

* Deletes documents with sepcified ID from database



##### `Query parameters`

* id (required)

* Query Parameter — ID of the form that needs to be deleted

## Responses

##### 200

* Document has been successfully deleted

##### `400`

* invalid request, request rejected by backend/database

##### `500`

* could not find server/database
* * *

==========
### Default
==========

## `get/graphQL`

* Queries for document with specified parameters within database

##### `Query parameters`

* id / procedureID / title / name

* Query Parameter — use any combination of id/ procedureID/ title/ name to query specified document(s) from the database

##### Return type

* array\[[SDCForm]\]

##### Example data

Content-Type: application/json

    [ {
      "ProcedureId" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
      "Sections" : [ {
        "MustImplement" : true,
        "Subsections" : [ '', '' ],
        "Title" : "Title",
        "Questions" : [ {
          "TextAfterResponse" : "TextAfterResponse",
          "IsEnabled" : true,
          "Title" : "Title",
          "Properties" : [ '', '' ],
          "Name" : "Name",
          "MustImplement" : true,
          "Type" : "Type",
          "Answer" : {
            "Attributes" : {
              "FormResponseId" : 2.027123023002322,
              "QuestionId" : 4.145608029883936
            }
          },
          "MaxCard" : 9,
          "Questionid" : 3.616076749251911,
          "MinCard" : 7,
          "SectionId" : 2.3021358869347655,
          "SubQuestions" : [ '', '' ]
        }, {
          "TextAfterResponse" : "TextAfterResponse",
          "IsEnabled" : true,
          "Title" : "Title",
          "Properties" : [ '', '' ],
          "Name" : "Name",
          "MustImplement" : true,
          "Type" : "Type",
          "Answer" : {
            "Attributes" : {
              "FormResponseId" : 2.027123023002322,
              "QuestionId" : 4.145608029883936
            }
          },
          "MaxCard" : 9,
          "Questionid" : 3.616076749251911,
          "MinCard" : 7,
          "SectionId" : 2.3021358869347655,
          "SubQuestions" : [ '', '' ]
        } ],
        "ID" : "ID",
        "Mincard" : 5,
        "Maxcard" : 5,
        "Name" : "Name"
      }, {
        "MustImplement" : true,
        "Subsections" : [ '', '' ],
        "Title" : "Title",
        "Questions" : [ {
          "TextAfterResponse" : "TextAfterResponse",
          "IsEnabled" : true,
          "Title" : "Title",
          "Properties" : [ '', '' ],
          "Name" : "Name",
          "MustImplement" : true,
          "Type" : "Type",
          "Answer" : {
            "Attributes" : {
              "FormResponseId" : 2.027123023002322,
              "QuestionId" : 4.145608029883936
            }
          },
          "MaxCard" : 9,
          "Questionid" : 3.616076749251911,
          "MinCard" : 7,
          "SectionId" : 2.3021358869347655,
          "SubQuestions" : [ '', '' ]
        }, {
          "TextAfterResponse" : "TextAfterResponse",
          "IsEnabled" : true,
          "Title" : "Title",
          "Properties" : [  ],
          "Name" : "Name",
          "MustImplement" : true,
          "Type" : "Type",
          "Answer" : {
            "Attributes" : {
              "FormResponseId" : 2.027123023002322,
              "QuestionId" : 4.145608029883936
            }
          },
          "MaxCard" : 9,
          "Questionid" : 3.616076749251911,
          "MinCard" : 7,
          "SectionId" : 2.3021358869347655,
          "SubQuestions" : [ '', '' ]
        } ],
        "ID" : "ID",
        "Mincard" : 5,
        "Maxcard" : 5,
        "Name" : "Name"
      } ],
      "releaseDate" : "2016-08-29T09:12:33.001Z",
      "MetaProperties" : {
        "Version" : 0.8008281904610115,
        "Title" : "Appendix form",
        "URI" : "URI",
        "properties" : {
          "Order" : 6.027456183070403,
          "Val" : "Val",
          "Type" : "Type",
          "PropName" : "PropName",
          "Propclass" : "Propclass",
          "Name" : "Name"
        }
      },
      "PatientId" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
      "name" : "Widget Adapter",
      "Footer" : "Footer",
      "Contact" : {
        "emails" : [ {
          "Name" : "Name"
        }, {
          "Name" : "Name"
        } ],
        "OrganizationNmae" : "OrganizationNmae"
      },
      "BodyProperties" : {
        "Title" : "Title",
        "Id" : 1.4658129805029452,
        "Properties" : [ '', '' ]
      }
    }, {
      "ProcedureId" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
      "Sections" : [ {
        "MustImplement" : true,
        "Subsections" : [ '', '' ],
        "Title" : "Title",
        "Questions" : [ {
          "TextAfterResponse" : "TextAfterResponse",
          "IsEnabled" : true,
          "Title" : "Title",
          "Properties" : [ '', '' ],
          "Name" : "Name",
          "MustImplement" : true,
          "Type" : "Type",
          "Answer" : {
            "Attributes" : {
              "FormResponseId" : 2.027123023002322,
              "QuestionId" : 4.145608029883936
            }
          },
          "MaxCard" : 9,
          "Questionid" : 3.616076749251911,
          "MinCard" : 7,
          "SectionId" : 2.3021358869347655,
          "SubQuestions" : [ '', '' ]
        }, {
          "TextAfterResponse" : "TextAfterResponse",
          "IsEnabled" : true,
          "Title" : "Title",
          "Properties" : [ '', '' ],
          "Name" : "Name",
          "MustImplement" : true,
          "Type" : "Type",
          "Answer" : {
            "Attributes" : {
              "FormResponseId" : 2.027123023002322,
              "QuestionId" : 4.145608029883936
            }
          },
          "MaxCard" : 9,
          "Questionid" : 3.616076749251911,
          "MinCard" : 7,
          "SectionId" : 2.3021358869347655,
          "SubQuestions" : [ '', '' ]
        } ],
        "ID" : "ID",
        "Mincard" : 5,
        "Maxcard" : 5,
        "Name" : "Name"
      }, {
        "MustImplement" : true,
        "Subsections" : [ '', '' ],
        "Title" : "Title",
        "Questions" : [ {
          "TextAfterResponse" : "TextAfterResponse",
          "IsEnabled" : true,
          "Title" : "Title",
          "Properties" : [ '', '' ],
          "Name" : "Name",
          "MustImplement" : true,
          "Type" : "Type",
          "Answer" : {
            "Attributes" : {
              "FormResponseId" : 2.027123023002322,
              "QuestionId" : 4.145608029883936
            }
          },
          "MaxCard" : 9,
          "Questionid" : 3.616076749251911,
          "MinCard" : 7,
          "SectionId" : 2.3021358869347655,
          "SubQuestions" : [ '', '' ]
        }, {
          "TextAfterResponse" : "TextAfterResponse",
          "IsEnabled" : true,
          "Title" : "Title",
          "Properties" : [ '', '' ],
          "Name" : "Name",
          "MustImplement" : true,
          "Type" : "Type",
          "Answer" : {
            "Attributes" : {
              "FormResponseId" : 2.027123023002322,
              "QuestionId" : 4.145608029883936
            }
          },
          "MaxCard" : 9,
          "Questionid" : 3.616076749251911,
          "MinCard" : 7,
          "SectionId" : 2.3021358869347655,
          "SubQuestions" : [ '', '' ]
        } ],
        "ID" : "ID",
        "Mincard" : 5,
        "Maxcard" : 5,
        "Name" : "Name"
      } ],
      "releaseDate" : "2016-08-29T09:12:33.001Z",
      "MetaProperties" : {
        "Version" : 0.8008281904610115,
        "Title" : "Appendix form",
        "URI" : "URI",
        "properties" : {
          "Order" : 6.027456183070403,
          "Val" : "Val",
          "Type" : "Type",
          "PropName" : "PropName",
          "Propclass" : "Propclass",
          "Name" : "Name"
        }
      },
      "PatientId" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
      "name" : "Widget Adapter",
      "Footer" : "Footer",
      "Contact" : {
        "emails" : [ {
          "Name" : "Name"
        }, {
          "Name" : "Name"
        } ],
        "OrganizationNmae" : "OrganizationNmae"
      },
      "BodyProperties" : {
        "Title" : "Title",
        "Id" : 1.4658129805029452,
        "Properties" : [ '', '' ]
      }
    } ]

##### Produces

* This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

*   `application/json`

## Responses

##### 200

* Documents matching parameters has been returned by the server

##### `400`

* invalid request, request rejected by backend/database

##### `500`

* could not find server/database

* * *

# Models
------


### Table of Contents

1.  [`SDCQuestion`]
2.  [`SDCSection`]
3.  [`SDCForm`]
4.  [`SDCQuestionResponse`]
5.  [`SDCFormResponse`]






## `[SDCQuestion]` 

##### id

* `String`
* example: "732432.00000"

##### docType

* `String`
* example: "SDCQuestion"

##### name

* `String`
* example: "Frontal lobe XXXX"

##### title

* `String`
* example: "Describe the last time XXXX"

##### mustImplement

* `Boolean`
* example: True

##### readOnly

* `Boolean`
* example: True

##### minCard

* `Int`
* example: 324324

##### maxCard

* `Int`
* example: 324324

##### maxSelections

* `Int`
* example: 0

##### questionType

* `String`
* example: "TextResponse"

##### isEnabled

* `Boolean`
* example: True

##### superQuestionID

* `String`
* example: "832749.0000"

##### superQuestionAnswer

* `String`
* example: "true"

##### textAfterResponse

* `String`
* example: "Thank you for your input"


## `[SDCSection]` 

##### id

* `String`
* example: "732432.00000"

##### docType

* `String`
* example: "SDCSection"

##### name

* `String`
* example: "Frontal lobe XXXX"

##### title

* `String`
* example: "Describe the last time XXXX"

##### type

* `String`
* example: "Description of lung"

##### mustImplement

* `Boolean`
* example: True

##### readOnly

* `Boolean`
* example: True

##### minCard

* `Int`
* example: 324324

##### maxCard

* `Int`
* example: 324324

##### questions

* `SDCQuestion[]`
* example: [{id:....}, {id:......}]

##### subsections

* `String[]`
* example: ['3246873246.000', '876873.000']


## `[SDCForm]` 

##### id

* `String`
* example: "732432.00000"

##### docType

* `String`
* example: "SDCForm"

##### procedureID

* `String`
* example: "7234987.0000"

##### patientID

* `String`
* example: "smith7329"

##### lineage

* `String`
* example: "3432324"

##### title

* `String`
* example: "Describe the last time XXXX"

##### uri

* `String`
* example: "http://uewriuewyiewuryiw.udshifis"

##### sections

* `String[]`
* example: ['3246873246.000', '876873.000']


##### footer

* `String`
* example: "Copyright 2020 XXXX"

##### lastModified

* `String`
* example: "2020.10.29.09:44:23:23"

## `SDCQuestionResponse` 
###### corresponds to SDCFormResponse in domain model
##### id

* `String`
* example: "732432.000001a"

##### questionID

* `String`
* example: "732432.00000"

##### userInput

* `String[]`
* example: ['hearing-loss', 'pain-in-abdoment']

## `SDCQuestionResponse` 

##### id

* `String`
* example: "732432.000001b"

##### formID

* `String`
* example: "732432.00000"

##### formfillerID

* `String`
* example: "randomDoc738"

##### patientID

* `String`
* example: "myPatient738"

##### responses

* `Object[]`
* example: [{id:....}, {id:.....}]

## `SDCFormResponse` 

##### id

* `String`
* example: "732432.000001"

##### formID

* `String`
* example: "732432.00000"

##### formfillerID

* `String`
* example: "randomDoc738"

##### patientID

* `String`
* example: "myPatient738"

##### responses

* `SDCQuestionResponse[]`
* example: [{id:....}, {id:.....}]





### JSON of swagger API
``` 
{
  "openapi": "3.0.0",
  "info": {
    "title": "Simple Api for SDC_Form_Manager",
    "description": "This is a simple API",
    "license": {
      "name": "Apache 2.0",
      "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
    },
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "https://virtserver.swaggerhub.com/crunchycoders9/SDC_Form_Manager/1.0.0",
      "description": "SwaggerHub API Auto Mocking"
    }
  ],
  "paths": {
    "/graphQL": {
      "get": {
        "summary": "queries for the SDC document based on ID",
        "description": "By passing in the appropriate options, you can search for\navailable documents in the database\n",
        "operationId": "queryDoc",
        "parameters": [
          {
            "name": "uid",
            "in": "query",
            "description": "use the unique ID to query a document",
            "required": true,
            "style": "form",
            "explode": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "search results matching criteria",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/SDCForm"
                  }
                }
              }
            }
          },
          "400": {
            "description": "bad input parameter"
          }
        }
      },
      "post": {
        "summary": "adds an SDC Form to the database based on the xml provided",
        "description": "Adds an SDC Form to the system",
        "operationId": "addInventory",
        "requestBody": {
          "description": "Inventory item to add",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SDCForm"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "SDC Form created"
          },
          "400": {
            "description": "invalid input, object invalid"
          },
          "409": {
            "description": "an SDC Form already exists"
          }
        }
      },
      "delete": {
        "summary": "Delete form based on ID",
        "description": "Deletes documents with sepcified ID from database",
        "operationId": "deleteOrder",
        "parameters": [
          {
            "name": "id",
            "in": "query",
            "description": "ID of the form that needs to be deleted",
            "required": true,
            "style": "form",
            "explode": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Invalid ID supplied"
          },
          "404": {
            "description": "document not found"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "SDCForm": {
        "required": [
          "BodyProperties",
          "Contact",
          "Footer",
          "FormFillerID",
          "MetaProperties",
          "PatientID",
          "Sections",
          "procedureID"
        ],
        "type": "object",
        "properties": {
          "ProcedureId": {
            "type": "string",
            "format": "uuid",
            "example": "d290f1ee-6c54-4b01-90e6-d701748f0851"
          },
          "PatientId": {
            "type": "string",
            "format": "uuid",
            "example": "d290f1ee-6c54-4b01-90e6-d701748f0851"
          },
          "name": {
            "type": "string",
            "example": "Widget Adapter"
          },
          "releaseDate": {
            "type": "string",
            "format": "date-time",
            "example": "2016-08-29T09:12:33.001Z"
          },
          "MetaProperties": {
            "$ref": "#/components/schemas/SDCFormMeta"
          },
          "Contact": {
            "$ref": "#/components/schemas/Contact"
          },
          "BodyProperties": {
            "$ref": "#/components/schemas/SDCFormBody"
          },
          "Footer": {
            "type": "string"
          },
          "Sections": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SDCSection"
            }
          }
        }
      },
      "SDCFormMeta": {
        "required": [
          "Properties",
          "Title",
          "URI",
          "Version"
        ],
        "type": "object",
        "properties": {
          "Title": {
            "type": "string",
            "example": "Appendix form"
          },
          "URI": {
            "type": "string"
          },
          "Version": {
            "type": "number"
          },
          "properties": {
            "$ref": "#/components/schemas/SDCProperty"
          }
        }
      },
      "Contact": {
        "required": [
          "OrganizationName",
          "emails"
        ],
        "type": "object",
        "properties": {
          "OrganizationNmae": {
            "type": "string"
          },
          "emails": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/email"
            }
          }
        }
      },
      "email": {
        "required": [
          "Name"
        ],
        "type": "object",
        "properties": {
          "Name": {
            "type": "string"
          }
        }
      },
      "SDCProperty": {
        "required": [
          "Name",
          "Order",
          "PropClass",
          "PropName",
          "Type",
          "Val"
        ],
        "type": "object",
        "properties": {
          "Name": {
            "type": "string"
          },
          "Order": {
            "type": "number"
          },
          "PropName": {
            "type": "string"
          },
          "Val": {
            "type": "string"
          },
          "Propclass": {
            "type": "string"
          },
          "Type": {
            "type": "string"
          }
        }
      },
      "SDCFormBody": {
        "required": [
          "ID",
          "Properties",
          "Title"
        ],
        "type": "object",
        "properties": {
          "Title": {
            "type": "string"
          },
          "Id": {
            "type": "number"
          },
          "Properties": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SDCProperty"
            }
          }
        }
      },
      "SDCSection": {
        "required": [
          "ID",
          "MaxCard",
          "MinCard",
          "MustImplement",
          "Name",
          "Properties",
          "Questions",
          "SubSections",
          "Title",
          "Type"
        ],
        "type": "object",
        "properties": {
          "Name": {
            "type": "string"
          },
          "Title": {
            "type": "string"
          },
          "ID": {
            "type": "string"
          },
          "Properties": {
            "$ref": "#/components/schemas/SDCProperty"
          },
          "MustImplement": {
            "type": "boolean"
          },
          "Mincard": {
            "type": "integer"
          },
          "Maxcard": {
            "type": "integer"
          },
          "Questions": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SDCQuestion"
            }
          },
          "Subsections": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SDCSection"
            }
          }
        }
      },
      "SDCQuestion": {
        "required": [
          "Answer",
          "MaxCard",
          "MinCard",
          "MustImplement",
          "Name",
          "Properties",
          "QuestionID",
          "SubQuestions",
          "SuperAnswerID",
          "SuperQuestionID",
          "TextAfterResponse",
          "Title",
          "Type",
          "sectionID"
        ],
        "type": "object",
        "properties": {
          "Name": {
            "type": "string"
          },
          "SectionId": {
            "type": "number"
          },
          "Properties": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SDCProperty"
            }
          },
          "MustImplement": {
            "type": "boolean"
          },
          "MinCard": {
            "type": "integer"
          },
          "MaxCard": {
            "type": "integer"
          },
          "Questionid": {
            "type": "number"
          },
          "Type": {
            "type": "string"
          },
          "Title": {
            "type": "string"
          },
          "IsEnabled": {
            "type": "boolean"
          },
          "TextAfterResponse": {
            "type": "string"
          },
          "Answer": {
            "$ref": "#/components/schemas/SDCFormResponse"
          },
          "SubQuestions": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SDCQuestion"
            }
          }
        }
      },
      "SDCFormTextResponse": {
        "required": [
          "Attributes"
        ],
        "type": "object",
        "properties": {
          "Attributes": {
            "$ref": "#/components/schemas/SDCFormResponseAttributes"
          },
          "UserInput": {
            "type": "string"
          }
        }
      },
      "SDCFormNumResponse": {
        "required": [
          "Attributes"
        ],
        "type": "object",
        "properties": {
          "Attributes": {
            "$ref": "#/components/schemas/SDCFormResponseAttributes"
          },
          "UserInput": {
            "type": "number"
          }
        }
      },
      "SDCFormSingleChoiceResponse": {
        "required": [
          "Attributes"
        ],
        "type": "object",
        "properties": {
          "Attributes": {
            "$ref": "#/components/schemas/SDCFormResponseAttributes"
          },
          "Choices": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "UserInput": {
            "type": "string"
          }
        }
      },
      "SDCFormResponse": {
        "oneOf": [
          {
            "$ref": "#/components/schemas/SDCFormSingleChoiceResponse"
          },
          {
            "$ref": "#/components/schemas/SDCFormNumResponse"
          },
          {
            "$ref": "#/components/schemas/SDCFormTextResponse"
          }
        ]
      },
      "SDCFormResponseAttributes": {
        "required": [
          "FormResponseID",
          "QuestionID"
        ],
        "type": "object",
        "properties": {
          "FormResponseId": {
            "type": "number"
          },
          "QuestionId": {
            "type": "number"
          }
        }
      }
    }
  }
}
```