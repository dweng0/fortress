import '@firebase/firestore';
import React, {useEffect} from 'react';
import service from '../service';

const dbh = service.collections;


  export const useDocument = () => {
    const [response, setResponse] = React.useState(null);
    const [loaded, setLoaded] = React.useState(false);
    const [err, setErr] = React.useState(null);

    const  setDocument = (method, collection, data) => {
        let query;
        try {
            switch(method.toLowerCase()) {
                case 'get': {
                    query = dbh.collection(collection).get()
                    
                    break ;
                }
                case 'put': {
                    if(!data || !data.id) {
                        throw new Error('must provide an id in the data object to update collections');
                    }
                    query = dbh.collection(collection).doc(data.id);
                    break;
                }
                case 'post': {
                query = dbh.collection(collection).set(data);
                break;
                }           
                default: {
                    query = dbh.collection(collection).get();
                    break;
                }            
            }
        query.then((resp) => {setResponse(resp)})
        .catch(e => setErr(e));
        }
        catch(e) {
          setErr(e);
        }
    };

    useEffect(() => {
        setLoaded(!!(response));
    }, [response, err]);

    return [{response, loaded, err}, setDocument];
  }
