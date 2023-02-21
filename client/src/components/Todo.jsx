import React,{useState, useEffect} from 'react'
import axios from 'axios';

const Todo = () => {
  const [valid, setValid] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    
  axios.get("/api/v1/getalltasks").then((res) => {
    console.log(res);
    setData(res.data);
    // console.log(data);
    setValid(true)
    
  }).catch((err)=> {
    setValid(false);
    console.log(err);
  });

  }, [])
  return (
    <>
        {
          valid ? <h1>valid</h1> : <h1>not valid</h1>
        }
      
    </>
  )
}

export default Todo