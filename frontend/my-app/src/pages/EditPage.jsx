import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { ArrowBigLeft } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const EditPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/notes/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setLoading(false);
      } catch (err) {
        toast.error("Failed to load note");
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (!title || !content) {
        toast.error("Both fields are required");
        return;
      }

      const res = await axios.put(`http://localhost:3000/api/notes/update/${id}`, {
        title,
        content
      });

      if (res.status === 200) {
        toast.success("Note updated successfully");
        navigate('/');
      }
    } catch (err) {
      toast.error("Error updating note");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className='min-h-screen w-full px-4 py-6'>
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
              <h2 className='card-title text-2xl mb-4'>Edit Note</h2>

              {loading ? (
                <p className='text-center text-base-content/70'>Loading...</p>
              ) : (
                <form onSubmit={handleUpdate}>
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
                      <span className='label-text font-extrabold text-xl p-5'>Content</span>
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
                      disabled={saving}
                    >
                      {saving ? "Updating..." : "Update Note"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
