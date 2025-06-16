import React from 'react'
import Navbar from '../Components/Navbar'
import { useState } from 'react'
import RateLimit from '../Components/RateLimit';
import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import NoteCard from '../Components/NoteCard';
const HomePage = () => {
    const [isRateLimited, setisRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchNotes = async () => {
            setLoading(true)
            try {
                const response = await axios.get('http://localhost:3000/api/notes');
                console.log(response.data.message);
                setNotes(response.data.message);
                setisRateLimited(false);
            } catch (err) {
                setLoading(false)
                console.log(err);
                if (err.response?.status === 429) {
                    console.log("Too many requests");
                    setisRateLimited(true);
                    setNotes([]);
                } else {
                    setError(true);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, []); 



    return (
        <div className='max-w-7xl mx-auto p-4'>
            {loading && <div className='text-center text-primary py-3'>
                Loading notes....
                </div>}
            <Navbar />
            {isRateLimited && (
                <div>
                    <RateLimit />
                    <button className='btn btn-neutral' onClick={() => window.location.reload()}>Retry</button>
                </div>
            )}

            <div className=''>
                {notes.map((note) => (
                    <NoteCard key={note._id} note={note} setNotes={setNotes}/>
                ))}
            </div>
        </div>
    )
}

export default HomePage