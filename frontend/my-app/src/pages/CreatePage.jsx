import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router'; // ✅ Use react-router-dom, not just 'react-router'
import { ArrowBigLeft } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    console.log(title, content);
    setLoading(true);
    try {
      if (!title || !content) {        
        toast.error("Both fields are required");
        return;
      }
      const res = await axios.post('http://localhost:3000/api/notes/create', {
        title: title,
        content: content
      })
      console.log(res);
      
      if (res.status === 201) {
        toast.success("Created Note successfully");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error");
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div className='min-h-screen w-full px-4 py-6 '>
      <div className='container mx-auto px-4 py-6'>
        <div className='max-w-2xl mx-auto'>
          {/* Back Button */}
          <Link to="/" className='btn btn-ghost mb-6 flex items-center gap-2 w-fit'>
            <ArrowBigLeft className='size-5' />
            <span>Back to Notes</span>
          </Link>

          {/* Note Form Card */}
          <div className='card bg-base-100 shadow-lg'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Note</h2>

              <form onSubmit={handleSubmit}>
                {/* Title Field */}
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text font-extrabold text-xl p-9'>Title</span>
                  </label>
                  <input
                    type="text"
                    className='input rounded-md placeholder:text-xl outline-none text-zinc-700 input-bordered'
                    placeholder='Enter title for the note'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Content Field */}
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text font-bold font-extrabold text-xl p-5'>Content</span>
                  </label>
                  <textarea
                    className='textarea rounded-md outline-none placeholder:text-xl text-zinc-700 textarea-bordered min-h-[120px]'
                    placeholder='Enter the content of the note'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className='card-actions justify-end'>
                  <button
                    className='btn btn-primary'
                    type='submit'
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreatePage;
