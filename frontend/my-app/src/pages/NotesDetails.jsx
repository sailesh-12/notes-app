import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router'; // ✅ Use react-router
import axios from 'axios';
import toast from 'react-hot-toast';
import { LoaderIcon, ArrowLeft, Hash } from 'lucide-react';

const NotesDetails = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  let hasFetched = false;

  const navigate = useNavigate();
  const { id } = useParams(); // ✅ Correct usage

  useEffect(() => {

    const fetchNote = async () => {
      if (hasFetched) return;
      hasFetched=true;
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/api/notes/${id}`);
        console.log(res.data);
        toast.success("Note fetched successfully");
        setNote(res.data.message);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoaderIcon className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Note not found.
      </div>
    );
  }

  return (
    <div className=" min-h-screen px-4 py-10">
      <div className="max-w-3xl mx-auto card bg-base-100 shadow-lg p-6">
        <button className="btn btn-ghost mb-4 flex items-center gap-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="size-4" />
          Back
        </button>
        <h1 className="text-3xl font-bold text-primary mb-4">{note.title}</h1>
        <p className="text-lg text-base-content whitespace-pre-line">{note.content}</p>

        <div className="mt-6 text-sm text-base-content/60 flex flex-col gap-1">
          <span><span className="text-primary">Created At:</span> {new Date(note.createdAt).toLocaleString()}</span>
          <span><span className="text-primary">Updated At:</span> {new Date(note.updatedAt).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default NotesDetails;
