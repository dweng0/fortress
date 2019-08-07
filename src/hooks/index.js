import firebase from 'firebase'
import '@firebase/firestore';
import React from 'react';
import service from '../service';

const dbh = service.collections;


  export const useDocument = (method, collection, data, options) => {
    const [promise, setPromise] = React.useState(null);
    const [error, setError ] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const effect = async () => {
    setIsLoading(true);
        try {
            switch(method.toLowerCase()) {
            case 'get': {
                return dbh.collection(collection).get();
            }
            case 'put': {
                if(!data || !data.id) {
                    throw new Error('must provide an id in the data object to update collections');
                }
                dbh.collection(collection).doc(data.id);
            }
            case 'post': {
              return dbh.collection(collection).set(data)
            }
            case 'delete': {

            }
            default: {
                //treat like a get
            }
        }
        }
        catch(e) {
            setIsLoading(false);
            setError('Error communicating with database');
        }

    }
    useEffect( () => {effect();}, []);
    return { promise, error, isLoading};
  }

  export default useFetch;