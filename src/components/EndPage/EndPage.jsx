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
   <div className="end-page-container">
            
            <div className="end-page">
            {/* לוגו מדור טיל ואסטרונאוט בחלק העליון */}
            <Header chapterName="סוף לומדה" />
            <div className="top-branding">
                <img src={tillLogo} className="till-logo-end" alt="מדור טיל" />
                <img src={astronout} className="top-astronaut" alt="astronaut" />
            </div>

            <div className="main-content">
                <h1 className="title-text">איזה כיף סיימת <br/> את הלומדה!</h1>
                
                <div className="summary-section">
                    <p className="summary-title">אלה כל הנושאים שעברנו עליהם:</p>
                    <div className="divider"></div>
                </div>

                <div className="path-map">
                    <img src={navBar} className="path-svg" alt="navigation path" />
                    {/* תוויות על המסלול */}
                    <span className="step s1">משחק</span>
                    <span className="step s2">איך מפוצצים אסטרואיד?</span>
                    <span className="step s3">סוגי אסטרואידים</span>
                    <span className="step s4">פיצוץ אסטרואיד</span>
                    <span className="step s5">מהו אסטרואיד?</span>
                </div>

                <button className="back-to-start" onClick={() => navigate("/start")}>
                    לחזור לתחילת הלומדה
                </button>

                <div className="bottom-alien">
                    <div className="speech-box">
                        עכשיו אתם מוכשרים להיות אסטרונאוטים
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