import './styles/App.css'
import Gallery from './Gallery'
// import img from './assets/galleryImgs/'

function App() {
  const imgNameArr = ['stock1.jpg', 'stock2.jpg', 'stock3.jpg','stock4.jpg', 'stock5.jpg', 'stock6.jpg'];
  const imgDirArr = imgNameArr.map((element) => { return './assets/galleryImgs/' + element; }); // I tried not to hard code it but I couldnt as all solutions I found use WebPack which is not included in vite which i have used. 
  return (
    <>
      <h1 className="pageTitle">Carousel</h1>
      <Gallery imgDirArr={imgDirArr}/>
    </>
  )
}

export default App
