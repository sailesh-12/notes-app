import { Link, useNavigate } from 'react-router'
import React from 'react'
import { PenSquareIcon, Trash2Icon, TrashIcon } from 'lucide-react'
import { formatDate } from '../utils/utils.js';
import toast from 'react-hot-toast';
import axios from 'axios';
const NoteCard = ({note,setNotes}) => {
    const navigate=useNavigate();
    const handleDelete=async(e,id)=>{
        e.preventDefault(); //get rid of the navigation behaviour
        console.log(id);
        
        if (!window.confirm("Are you sure want to delete this note")) return;
        try{
            await axios.delete(`http://localhost:3000/api/notes/delete/${id}`);
            toast.success("Deleted successfully");
            setNotes((prev)=>prev.filter((note)=>note._id!==id))
            navigate('/')
        }catch(err){
            console.log("Error occured");
            toast.error("Error occured")   
        }

    }
    const handleUpdate=async(e,id)=>{
        e.preventDefault();
        try{
            const res=axios.put(`http://localhost:3000/api/notes/update/${id}`,{

            });
            console.log(res);
        }catch(err){
            toast.error("Error occured");
            console.log(err);
        }
    }
  return (
    <Link to={`/notes/${note._id}`}  className='bg-base-100 mt-5 card hover:shadow-lg translate-x-3 duration-200 border-t-4 border-solid border-[#2600ff]'>
        <div className='card-body'>
            <h3 className='text-base-content card-title '>{note.title}</h3>
            <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
            <div className="card-actions m-4 justify-between items-center mt-4 ">
                <span className='text-sm text-base-content/60'><span className='text-sm text-primary border-t-blue-100'>Created At: </span>  {formatDate(note.createdAt)}</span>
                <span className='text-sm text-base-content/40'><span className='text-sm text-primary border-t-blue-100'>Updated At: </span>  {formatDate(note.updatedAt)}</span>
                <div className='flex items-center gap-1'>
                    <Link to={`/update/${note._id}`}>
                       <PenSquareIcon />
                    </Link>
                    <button className='btn btn-ghost text-error ' onClick={(e)=>handleDelete(e,note._id)}>
                        <Trash2Icon />
                    </button>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default NoteCard