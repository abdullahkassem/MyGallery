import './styles/App.css'
import Gallery from './Gallery'
import {img1,img2,img3,img4,img5,img6} from './assets/galleryImgs/index';


function App() {
  const imgNameArr = [img1,img2,img3,img4,img5,img6];
  return (
    <>
      <h1 className="pageTitle">Carousel</h1>
      <Gallery imgDirArr={imgNameArr}/>
    </>
  )
}

export default App
