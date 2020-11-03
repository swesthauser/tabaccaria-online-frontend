import axios from 'axios';


const SessionHandler = {

    getSignedIn: (data) => {
        axios.post('http://localhost:2020/login', data)
            .then(res => {
                console.log('DATA', res.data)
                localStorage.setItem("user", JSON.stringify(res.data));
                // TO DO: add token --> bearer
                // localStorage.setItem("token", localStorage.getItem("token").replace('Bearer ', ''))
                console.log(localStorage);
            })
            .catch(err => {
                console.error('ERROR: ', err);
            })
    },

    getLoggedOut: (history) => {
        localStorage.clear();
        // history.push('/');
    },

    isLoggedIn: (history) => {
        if (!localStorage.getItem('user')) {
            // !localStorage.getItem('token') || 
            // history.push('/');
            console.error('Get no authorization');
            return false;
        } else {
            return true;
        }
    },

    getLoggedUser: (history) => {
        if (SessionHandler.isLoggedIn(history)) {
            console.log('USER ', JSON.parse(localStorage.getItem('user')));
            return JSON.parse(localStorage.getItem('user'));
        }
    }
};
export default SessionHandler;