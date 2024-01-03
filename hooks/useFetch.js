import {useState, useEffect} from 'react';
import axios from 'axios';

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: {
            ...query,
            num_pages: 1,
            country: 'uk'
        },
        headers: {
            'X-RapidAPI-Key': '7538460db8msh250864db34ed812p1bc05ejsnd00dbf300aea',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.request(options);
            setData(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            alert('Something went wrong. Please try again later.');
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true)
        fetchData();
    }

    return {data, isLoading, error, refetch}
};

export default useFetch;