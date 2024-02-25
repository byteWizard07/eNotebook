import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom' ;

const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNotes,editNote } = context;

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
    }
    else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  const refclose = useRef(null)

  const[note,setNote] = useState({id:"",etitle:"",edescription:"",etag:"default"})
 
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle:currentNote.title,edescription:currentNote.description
    ,etag:currentNote.tag})
    
  }

  const handleClick = (e)=>{
    console.log("updating the note...",note);
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refclose.current.click();
    props.showAlert("Updated Successfully","success");
}

const onchange =(e)=>{
     setNote({...note,[e.target.name]:e.target.value})
}
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      {/* <!-- Button trigger modal --> */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Notes</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle"
                  value={note.etitle} aria-describedby="emailHelp"
                    onChange={onchange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription"
                  value={note.edescription} onChange={onchange} minLength={5}required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag"
                  value={note.etag} onChange={onchange} />
                </div>
                
              </form>

            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container mx-2">
        {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
        }
        )}
      </div>
    </>
  )
}

export default Notes
