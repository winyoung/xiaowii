import Vue from 'vue'
import Router from 'vue-router'
import mainView from '@/components/mainView'
import hotSellingTrend from '@/components/proDev/hotSellingTrend'
import burstingDig from '../components/proDev/burstingDig.vue'
import newProDev from '../components/proDev/newProDev.vue'
import onlinePro from '../components/proDev/onlinePro.vue'
import proManage from '../components/proDev/proManage.vue'
import setting from '../components/proDev/setting.vue'
import showProDetail from '../components/reusableCom/showProDetail.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainView',
      component: mainView,
      children:[
        {
          path: 'hotSellingTrend',
          component: hotSellingTrend,
          children:[
            {path:'showProDetail',component:showProDetail}
          ]
        },
        {
          path: 'burstingDig',
          component: burstingDig,
          children:[
            {path:'showProDetail',component:showProDetail}
          ]
        },
        {
          path: 'newProDev',
          component: newProDev
        },
        {
          path: 'onlinePro',
          component: onlinePro
        },
        {
          path: 'proManage',
          component: proManage
        },
        {
          path: 'setting',
          component: setting
        }
      ]
    }
  ]
})
