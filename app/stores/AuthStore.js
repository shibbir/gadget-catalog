import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import AuthConstants from '../constants/AuthConstants';

class AuthStore extends EventEmitter {
    isLoggedIn() {
        return !!sessionStorage.getItem('jwtToken');
    }

    login(payload) {
        sessionStorage.setItem('jwtToken', payload.jwtToken);
        this.emit('loggedIn');
    }

    logout() {
        sessionStorage.removeItem('jwtToken');
        this.emit('loggedOut');
    }

    handleActions(action) {
        switch (action.type) {
            case AuthConstants.LOGIN: {
                this.login(action.payload);
                break;
            }
            case AuthConstants.REGISTER: {
                this.login(action.payload);
                break;
            }
            case AuthConstants.LOGOUT: {
                this.logout();
                break;
            }
        }
    }
}

const authStore = new AuthStore;
dispatcher.register(authStore.handleActions.bind(authStore));

export default authStore;
