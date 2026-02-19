import { useNavigate } from "react-router-dom";
const EndPage=()=>{
const navigate=useNavigate();
    return( 

        <button onClick={(()=>navigate("/start"))}></button>
    )
}
export default EndPage;