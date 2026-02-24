
import "./Header.css";
import astronaut from "../../assets/images/astronaut.svg"
import level1 from "../../assets/images/level1.svg"
import level2 from "../../assets/images/level2.svg"
import level3 from "../../assets/images/level3.svg"
import level4 from "../../assets/images/level4.svg"
import level5 from "../../assets/images/level5.svg"
import learningData from "../../data.json";
const Header = ({ chapterName }) => {
const progressImages = [level1, level2, level3, level4, level5];

const currentPage = learningData.pages.find(
    (page) => page.chapterName === chapterName
  );

  const chapterId = currentPage?.chapterId ?? 1;

  const imageIndex = Math.min(
    chapterId - 1,
    progressImages.length - 1
  );

  const currentImage = progressImages[imageIndex];
  return (
    <header className="header-container">
         <img
        src={currentImage}
        alt="progress"
        className="progress-image"
      />
      <svg
        viewBox="0 0 800 400"
        preserveAspectRatio="xMinYMid meet"
        className="curve-svg"
      >
        <defs>
          <path
            id="curve"
            d="M0,250 
               C120,240 200,200 280,140 
               C360,80 460,100 560,170 
               C660,240 720,200 800,190"
          />
        </defs>

        <use href="#curve" id="curve-path" />
        <text className="curved-text">
          <textPath href="#curve" startOffset="50%" textAnchor="middle">
            {chapterName}
          </textPath>
        </text>

        <g transform="translate(740,165) scale(0.25)">
          <path d="M134.979,109.125c0.466,1.445,0.846,2.931,1.13,4.415c0.366,1.916,2.043,3.249,3.924,3.249c0.25,0,0.503-0.023,0.757-0.072 c2.17-0.415,3.592-2.511,3.177-4.681c-0.346-1.805-0.808-3.61-1.374-5.366c-0.677-2.102-2.928-3.259-5.034-2.579 C135.455,104.769,134.3,107.023,134.979,109.125z"/>
          <path d="M94.22,78.258c-0.004,2.209,1.784,4.003,3.993,4.007c11.55,0.02,22.862,5.549,30.261,14.792 c0.79,0.986,1.952,1.5,3.126,1.5c0.876,0,1.759-0.287,2.497-0.877c1.725-1.381,2.003-3.898,0.623-5.623 c-8.899-11.117-22.542-17.769-36.493-17.792c-0.003,0-0.005,0-0.007,0C96.014,74.265,94.224,76.051,94.22,78.258z"/>
        </g>
      </svg>
      <img src={astronaut} id="astronaut-svg"></img>
    </header>
  );
};


export default Header;
