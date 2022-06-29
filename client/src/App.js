import Slider from './components/slider/slider';

function App() {


  // const [backendData, setBackendData] = useState([{}])

  // useEffect(() => {
  //   fetch("/api/playlist").then(
  //     response => response.json()
  //   ).then(
  //     data => {
  //       setBackendData(data)
  //     }
  //   )
  // },[])

  // const playlist = backendData.data;
  
  // console.log(playlist);
  // var currentMedia;



  return (
    <div className='App'>
      <Slider />
    </div>
  );
}

export default App;

// {(typeof backendData.data === 'undefined') ? (
//   <p>loading</p>
// ) : (
//   backendData.data.map(media => (
//     <p>{media.name}</p>
//   ))
// )}