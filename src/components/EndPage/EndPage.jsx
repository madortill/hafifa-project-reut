import { useNavigate } from "react-router-dom";
import navBar from "../../assets/images/navBar.svg"
import astroide from "../../assets/images/asteroid.svg";
import Header from "../Header/Header.jsx"
import alien from "../../assets/images/alien.svg"
import astronout from "../../assets/images/astronaut.svg"
import tillLogo from "../../assets/images/logoTill.png";


const EndPage=()=>{
const navigate=useNavigate();
    


return( 
    <>
    <Header chapterName="סוף לומדה" />
        <h2>איזה כיף סיימת את הלומדה !  </h2>
        <h4>אלה כל הנושאים שעברנו עליהם:</h4>
              <img className="navBar" src={navBar} onClick={()=>navigate("/learning")}></img>
          <img src={astroide}  id="astroide1" className="astroide" alt="astroide" />
          <img src={astroide}  id="astroide2" className="astroide" alt="astroide" />
        <button className="return=btn" onClick={(()=>navigate("/start"))}>לחזור לתחילת הלומדה</button>
    </>
    )
}
export default EndPage;