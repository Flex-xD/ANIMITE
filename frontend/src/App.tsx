import { useState  , useEffect} from "react"
import apiClient from "./middlewares/axios";

function App() {
  const [data , setData] = useState([]);
  useEffect(() => {
    const jinkanApiData = async () => {
      const res = await apiClient.get("https://api.jikan.moe/v4/anime?q=naruto");
      console.log(res.data);
      setData(res.data);
    }
    jinkanApiData();
    
  } , [data])
  return (
    <div>
      <h1>
      {data ? JSON.stringify(data) : "Loading...."}
      </h1>
    </div>
  )
}

export default App
