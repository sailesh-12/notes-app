import notes from "../models/Notes.js";

export async function getAllNotes(_, res) {
    try {
        const Notes = await notes.find().sort({createdAt:-1});
        return res.status(200).json({ message: Notes });
    } catch (err) {
        console.log("Error in this route", err);
        return res.status(500).json({ message: " Internal server Error" });
    }
}

export async function getNotesById(req,res){
    try{
        const {id}=req.params;
        const existingNote=await notes.findById({_id:id});
        if(!existingNote){
            return res.status(400).json({message:"Note not found"});
        }
        return res.status(200).json({message:existingNote})
    }catch(err){
        console.log(err);
    }
}


export async function createAllNotes(req, res) {
    try {
        console.log(req.body);

        const { title, content } = req.body;
        if (!title || !content) {
            return res.status.json({ message: "Give all the fields" });
        }
        const newNotes = await notes.create({ title: title, content: content });
        await newNotes.save();
        return res.status(201).json({ message: "Notes is created and added to Database", newNotes })
    } catch (err) {
        console.log(err);
    }
}

export async function updateAllNotes(req, res) {
    try {
        const { title, content } = req.body;
        const { id } = req.params;
        
        if (!title && !content) {
            return res.status(400).json({ message: "Give proper fields " });
        }

        const existingNote = await notes.findById({ _id: id });
        console.log(existingNote); //Debugging purpose

        if (!existingNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        const updatedNote = await notes.findByIdAndUpdate(id,
            {
                $set: {
                    title,
                    content,
                },
            },
            { new: true } // return new note with updated results
        )
        return res.status(200).json({ message: "Notes are updated successfully", updatedNote });
    } catch (err) {
        console.log(err);
    }
}



export async function deleteAllNotes(req, res) {
    try {
        const { id } = req.params;
        console.log(id); //debugging purpose

        const existingNote = await notes.findById({ _id: id });
        if (!existingNote) {
            return res.status(400).json({ message: "Note not found" });
        }
        const deletedNote = await notes.findByIdAndDelete(id, { new: true });
        console.log(deletedNote);

        return res.status(200).json({ message: "Notes deleted successfully", deletedNote });
    } catch (err) {
        console.log(err);
    }
}