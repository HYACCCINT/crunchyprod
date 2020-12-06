### Frontend

For our frontend, we decided to go with React. Our main contenders were React and Angular and we didn’t really want to with pure HTML and CSS because that would take a lot of management on our own end. React also doesn’t need to follow a framework and is more flexible when compared to Angular, plus it can run in parallel with a lot of the node libraries we planned to use for our backend. Lastly, a lot of our team members had React as a learning goal so it made sense to use it for our frontend.

### Backend

For our backend, we chose Node and Express. A majority of our team members are very familiar working with these two. In addition, since we were using React on our frontend, it meant we would be working with Node on our backend, of which Express is the default.

### Database

For our database, we had a CouchDB database on which GraphQL operations are performed. The use cases included many instances where one might be updating the SDCForm frequently, which is why we decided on a NoSQL database. The mutation of forms would be easier since fields could be added or taken away. Additionally, there was familiarity working with CouchDB within the group.

### Testing

In terms of testing, we used Jest for the frontend and Jasmine for the backend. Jest is a good testing library for JavaScript frameworks with Node and React. Jasmine is an open source library that provides support for all things JavaScript and will be able to cover some of the cases that Jest can’t. 
