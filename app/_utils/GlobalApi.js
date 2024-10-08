import axios from "axios";


const SendEmail = async (data)=>{
    return await axios.post( "/api/send " , data ) ;
}


export default  SendEmail ;









