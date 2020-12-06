### Slice

We implemented mainly the SDC Form Manager use case. This includes the functionality to upload a form, update a form, display a created form, and delete a form.

### Demo

The demo starts at the main menu of the page, which has the 4 options: Upload Form, Display Form, Delete Form, and Update Form.

We can click on Upload Form or Update Form to go to a page that allows us to input an ID and an XML File that are to be (hypothetically) parsed into SDC Form objects and sent to the server.

In order to view SDC forms, we would go back to the main page and click 'Display Form'. This prompts for an ID to be input and once done, takes us to a page where the form is displayed for that ID. On this page, a form with the questions that require number, text, or multiple choice answers can be displayed.

In order to delete this form, we can go back to the main page and click 'Delete Form' which prompts an ID that can delete the form.

### Implementation

For the 4 features that we implemented, they are currently mocked using temporary data with a shared API rather than being truly hooked up together end-to-end, but the effect on the application remains the same. For example, the 'Delete Form' button would truly be deleting a form with the given ID from the database, but the 'Display Form' would simply render mocked data with the same API as what would be retrieved, and not a form specific to the ID that was input in. The 'Upload Form' and 'Update Form' pages have the exact same functionality and look, as they both take in an ID and XML file and then send those to the server, but the server cannot yet turn them into SDC Forms as the XML parsing functionality is not implemented yet.