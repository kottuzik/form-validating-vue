import { createRouter, createWebHashHistory } from 'vue-router';
import AboutMe from "@/components/InnerPages/AboutMe.vue";
import AnotherPage from "@/components/InnerPages/AnotherPage.vue";

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/about', component: AboutMe, alias: '/'},
        {path: '/another', component: AnotherPage}
    ]
})