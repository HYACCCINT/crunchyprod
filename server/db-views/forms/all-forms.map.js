function (doc) {
    if (doc.docType !== "SDCForm") {
      return;
    }
  
    emit(doc.procedureID, {
    "id": doc._id,
    "docType":doc.docType,
    "procedureID": doc.procedureID,
    "patientID": doc.procedureID,
    "title": doc.title,
    "lastModified": doc.lastModified,
    });
  }
