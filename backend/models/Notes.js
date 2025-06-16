import mongoose from 'mongoose';
//create a schema
//then model creation from schema
const NotesSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
},{timestamps:true});

const notes=mongoose.model("Notes",NotesSchema);
export default notes