import axios from 'axios'

function Requests() {
 
    if(sessionStorage.getItem('token'))
    {
        axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
        
    }
     return axios

}



export default Requests ;