import Vue from 'vue';
import Vuex from 'vuex';
import util from "./assets/js/MethodsUtil";
Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        token:util.getcookie('token'),
        loginStatus:(util.getcookie('token') && util.getcookie('token') !='undefined') ? true : false ,
    },
    mutations:{
       SETTOKEN:(state,token)=>{
            state.token = token
        },
        LOGINSTATUS:(state,status)=>{
           state.loginStatus = status
        },

    },
    actions:{
      SETTOKEN:({commit}, payload)=>{
          util.setcookie('token',payload);              //将token存进cookie
          commit('SETTOKEN',payload);
          if(payload && payload != 'undefined'){
              commit('LOGINSTATUS',true);
          }else{
              commit('LOGINSTATUS',false);
          }
      }
    },
    getters:{
        loginStatus:(state)=>{
            return state.loginStatus
        },
        token:(state)=>{
            return state.token
        },
    }
})