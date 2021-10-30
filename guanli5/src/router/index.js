import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'


Vue.use(VueRouter)



const router = new VueRouter({
  routes:[
    { path: '/', redirect:'/login'},
    { path: '/login', component: Login}
  ],
  mode: 'history',
  base: process.env.BASE_URL,
  
})
//路由导航守卫 控制访问权限
router.beforeEach((to,from,next)=>{
if(to.path ==='/login')return next()
//获取token
const tokenStr =window.sessionStorage.getItem('token')
  if (!tokenStr)return next('/login')
  next()
  
})

export default router
