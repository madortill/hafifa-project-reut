import { useNavigate } from "react-router-dom";
import navBar from "../../assets/images/navBar.svg"
import astroide from "../../assets/images/asteroid.svg";
import Header from "../Header/Header.jsx"
import alien from "../../assets/images/alien.svg"
import astronout from "../../assets/images/astronaut.svg"
import tillLogo from "../../assets/images/logoTill.png";
import NavBar from "../../assets/images/navBar.svg";


const EndPage=()=>{
const navigate=useNavigate();
    


return( 
    <>
   <div className="end-page-container">
            
            <div className="end-page">
            <Header chapterName="סוף לומדה" />
            <div className="top-branding">
            </div>

            <div className="main-content">
                <h1 className="title-text">איזה כיף סיימת <br/> את הלומדה!</h1>
                
                <div className="summary-section">
                    <p className="summary-title">אלה כל הנושאים שעברנו עליהם:</p>
                    <div className="divider"></div>
                    <img src={NavBar}></img>
                </div>

              

                <button className="back-to-start" onClick={() => navigate("/start")}>
                    לחזור לתחילת הלומדה
                </button>

                <div className="bottom-alien">
                    <div className="speech-box">
                                                <div className="coord-bubble">                        עכשיו אתם מוכשרים להיות אסטרונאוטים
</div>

                    </div>
                    <img src={alien} className="alien-footer-img" alt="alien" />
                </div>
            </div>
        </div>
        </div>
    </>
    )
}
export default EndPage;