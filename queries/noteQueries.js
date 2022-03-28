function notesQuery() {
  return `{
          notes {
            title
            content
          }
        }`
}

function addNoteQuery(title, content) {
  return `mutation{
    addNote(title:"${title}",content:"${content}"){
        title
        content
    }
}`
}

export { notesQuery, addNoteQuery }