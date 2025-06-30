
// main.js/ts
import {createApp} from 'vue'
import App from './App.vue'

import {createBootstrap} from 'bootstrap-vue-next'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPenToSquare, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPenToSquare, faImage);

// Add the necessary CSS
import './assets/main.css'
import '../scss/custom.scss'


const app = createApp(App)
app.use(createBootstrap()) // Important
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount('#app')