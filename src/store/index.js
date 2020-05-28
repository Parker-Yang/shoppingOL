import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex); 
const store = new Vuex.Store({   
    state: {    
        // 存储token   
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''  
    },   
    mutations: {    
        // 修改token，并将token存入localStorage    
        changeLogin (state, user) {     
            state.Authorization = user.Authorization;
            localStorage.setItem('Authorization', user.Authorization);    
        },
        $_removeStorage(state, value){  // 删除token
            localStorage.removeItem('token');
        },  
    }
}); 
export default store;