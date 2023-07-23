import {useState, useEffect} from 'react';
import axios from 'axios';
// import {RAPID_API_KEY} from '@env';

// const rapidApiKey = RAPID_API_KEY;

const useFetch = (endpoint, query) => {
 const [data, setData] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState(null);

 const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: {
      query: 'Python developer in Texas, USA',
      page: '1',
      num_pages: '1'
    },
    headers: {
      'X-RapidAPI-Key': 'c16f1b6d17mshcebe96b92fc6582p13fc43jsnf395a1eabda1' ,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    },
    params: { ...query }
  };
  const fetchData = async()=> {
    setIsLoading(true);
    
    try {
        const response = await axios.request(options);
        setData(response.data.data);
        setIsLoading(false)
    } catch (error) {
        setError(error);
        alert('There is an Error')
    } finally {
        setIsLoading(false);
    }
  }  

  useEffect(() => {
    fetchData();
  }, [])

  const reFetch = () => {
    setIsLoading(true);
    fetchData();
  }
 
  return {data, reFetch, isLoading, error};
 }

 export default useFetch;