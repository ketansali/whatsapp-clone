import mongoose from "mongoose";

const connection = async()=>{

    try{
         mongoose.connect(process.env.DBURL).then(()=>{
            console.log('Database connected successfully');
         })
    }catch(error){
        console.log('Error while connecting with database',error.message);
    }
}
export default connection