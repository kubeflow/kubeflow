// Profile api to get current profile
import { wait } from '../utils/wait';
import axios from 'axios';
class ProfileAPI {
    async me(accessToken) {
        await wait(300)
        
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:8000/zoracloud/profiles/me', {
                  headers: {
                    'Authorization': `JWT ${accessToken}`
                  }
                })
              .then(function({
                data
              }){
                resolve(data)
              })
              .catch(function(error){
                console.error('[Auth Api]: ', err);
                reject(new Error('Internal server error'));
              })
          }

        )}

}

export const profileAPI = new ProfileAPI();