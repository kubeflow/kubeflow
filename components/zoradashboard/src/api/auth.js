import { generateResourceId } from '../utils/generate-resource-id';
import { sign, decode, JWT_SECRET, JWT_EXPIRES_IN } from '../utils/jwt';
import { wait } from '../utils/wait';
import axios from 'axios';
import jwt_decode from "jwt-decode";

const users = [
  {
    id: '5e86809283e28b96d2d38537',
    avatar: '/static/user-chen_simmons.png',
    email: 'demo@devias.io',
    name: 'Chen Simmons',
    password: 'Password123!'
  }
];

class AuthApi {
  async login({ username, password }) {
    await wait(500)

    return new Promise((resolve, reject) => {
  
      axios.post('http://localhost:8000/auth/jwt/create', {"username": username,"password": password})
        .then(function({
          data
        }){
          resolve(data['access'])
        })
        .catch(function(error){
          console.error('[Auth Api]: ', err);
          reject(new Error('Internal server error'));
        })
    }
  )}

  async register({ email, name, password }) {
    await wait(1000);

    return new Promise((resolve, reject) => {
      try {
        // Check if a user already exists
        let user = users.find((_user) => _user.email === email);

        if (user) {
          reject(new Error('User already exists'));
          return;
        }

        user = {
          id: generateResourceId(),
          avatar: null,
          email,
          name,
          password
        };

        users.push(user);

        const accessToken = sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        resolve(accessToken);
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  async me(accessToken) {
    await wait(500)
    return new Promise((resolve, reject) => {
      try {
        // Decode access token
        const { user_id } = jwt_decode(accessToken);
        console.log(user_id)

        // const decoded = jwt_decode(accessToken);
        // console.log(decoded)

        // Find the user
        // const user = users.find((_user) => _user.id === userId);

        // if (!user) {
        //   reject(new Error('Invalid authorization token'));
        //   return;
        // }

        resolve({
          id: user_id,
          // avatar: user.avatar,
          // email: user.email,
          // name: user.name
        });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const authApi = new AuthApi();
