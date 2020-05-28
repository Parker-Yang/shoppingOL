import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/Index'
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['@/components/Login'], resolve),
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['@/components/Register'], resolve),
    },
    {
      path: '/Index',
      name: 'Index',
      component: resolve => require(['@/components/Users/Index'], resolve),
      children:[
        {
              path: '/Index/Homepage',
              name: 'Homepage',
              component: resolve => require(['@/components/Users/Homepage'], resolve),
              children:[
                {
                  path: '/Index/Homepage/productinfo',
                  name: 'productinfo',
                  component: resolve => require(['@/components/Users/Productinfo'], resolve)
                }
              ],
        },
        {
          path: '/Index/product',
          name: 'product',
          component: resolve => require(['@/components/Users/Product'], resolve),
          children:[
            {
              path: '/Index/product/productinfo',
              name: 'productinfo_P',
              component: resolve => require(['@/components/Users/Productinfo'], resolve)
            }
          ],redirect:{name:'productinfo_P'}
        },
        {
          path: '/Index/about',
          name: 'about',
          component: resolve => require(['@/components/Users/About'], resolve),
        },
        {
          path: '/Index/Personal',
          name: 'personal',
          component: resolve => require(['@/components/Users/Personal'], resolve),
        },
      ],redirect:{name:'Homepage'}
    },
    {
      path: '/PersonalModify',
      name: 'PersonalModify',
      component: resolve => require(['@/components/Users/PersonalModify'], resolve),
    },
    {
      path: '/Forget',
      name: 'Forget',
      component: resolve => require(['@/components/Users/ForgetPassword'], resolve),
    },
    {
      path: '/Pay',
      name: 'Pay',
      component: resolve => require(['@/components/Users/Pay'], resolve),
    },
    {
      path: '/productdetails', 
      name: 'ProductDetails',
      component: resolve => require(['@/components/Users/ProductDetails'], resolve),
    },{
      path: '/OrderDetails', 
      name: 'OrderDetails',
      component: resolve => require(['@/components/Users/OrderDetails'], resolve),
    },
     
    {
      path: '/Adminindex',
      name: 'Adminindex',
      component: resolve => require(['@/components/Admin/Adminindex'], resolve),
      children:[
        {
          path:'/Adminindex/Adminmain',
          name:'Adminmain',
          component: resolve => require(['@/components/Admin/Adminmain'], resolve),
        },
        {
          path:'/Adminindex/Adminproduct',
          name:'Adminproduct',
          component: resolve => require(['@/components/Admin/Adminproduct'], resolve),
          children:[
            {
              path:'/Adminindex/Adminproduct/Addproduct',
              name:'Addproduct',
              component: resolve => require(['@/components/Admin/Addproduct'],resolve)
            },
            {
              path:'/Adminindex/Adminproduct/Deleteproduct',
              name:'Deleteproduct',
              component: resolve => require(['@/components/Admin/Deleteproduct'],resolve)
            },
            {
              path:'/Adminindex/Adminproduct/Modifyproduct',
              name:'Modifyproduct',
              component: resolve => require(['@/components/Admin/Modifyproduct'],resolve),
            },
            {
              path:'/Adminindex/Adminproduct/Modifyproduct/Modify-P-D',
              name:'Modify-P-D',
              component: resolve => require(['@/components/Admin/Modify-P-D'],resolve),
            }
          ],redirect:{name:'Addproduct'}
        },
        {
          path:'/Adminindex/Adminabout',
          name:'Adminabout',
          component: resolve => require(['@/components/Admin/Adminabout'], resolve),
          children:[
            {
              path:'/Adminindex/Adminabout/Modifyabout',
              name:'Modifyabout',
              component: resolve => require(['@/components/Admin/Modifyabout'],resolve)
            }
          ],redirect:{name:'Modifyabout'}
        },
        {
          path:'/Adminindex/Adminrelation',
          name:'Adminrelation',
          component: resolve => require(['@/components/Admin/Adminrelation'], resolve),
          children:[
            {
              path:'/Adminindex/Adminrelation/Modifyrelation',
              name:'Modifyrelation',
              component: resolve => require(['@/components/Admin/Modifyrelation'],resolve)
            }
          ],redirect:{name:'Modifyrelation'}
        },
      ],redirect:{name:'Adminmain'}
    },
  ]
})
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {  
  if (to.path === '/login') {    
    next();  
  } else {    
      let token = localStorage.getItem('Authorization');     
      if (token === 'null' || token === '') 
      {      
        next('/login');   
      } else {      
        next();    
        }  
      }
    }); 
    export default router;