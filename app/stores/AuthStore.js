import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

class AuthStore extends EventEmitter {
    isLoggedIn() {
        return !!sessionStorage.getItem('jwtToken');
    }

    login(data) {
        sessionStorage.setItem('jwtToken', data.jwtToken);
        this.emit('loggedIn');
    }

    logout() {
        sessionStorage.removeItem('jwtToken');
        this.emit('loggedOut');
    }

    handleActions(action) {
        switch (action.type) {
            case 'LOGIN': {
                this.login(action.data);
                break;
            }
            case 'REGISTER': {
                this.login(action.data);
                break;
            }
            case 'LOGOUT': {
                this.logout();
                break;
            }
        }
    }
}

const authStore = new AuthStore;
dispatcher.register(authStore.handleActions.bind(authStore));

export default authStore;
