import React from 'react';
import constants from '../constants';

/**
* useFetch options passes straight down to the javascript fetch api, take a look at that documentation
*/
const useFetch = (urlPart, options) => {
    const [response, setResponse] = React.useState(null);
    const [error, setError ] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    useEffect(async () => {
        setIsLoading(true);
        fetch(`${constants}${urlPart}`, options)
            .then(
                response => {
                    if (response.status > 299) {
                        setError(`Server responded with ${response.status}`);
                        return;
                    } else {
                        response.json().then(data => setResponse(data));
                    }
                    setIsLoading(false);
                }
            )
            .catch(
                err => {setError(err); setIsLoading(false);}
            );
    }, []);
    return { response, error, isLoading};
  };

  export default useFetch;