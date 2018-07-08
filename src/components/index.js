import Vue from 'vue'

//引入组件
import Breadcrumb from "./Breadcrumb";
import Layout from "./Layout";
import TableLayout from "./TableLayout";
import Button from "./Button"
import Dialog from "./Dialog"
import Tabs from "./Tabs"
import Form from "./Form"
import Table from "./Table";
import Echarts from "./Echarts";
import Upload from "./Upload";

//注册全局组件
Vue.component('singularity-breadcrumb', Breadcrumb)
Vue.component('singularity-layout', Layout)
Vue.component('singularity-table-layout', TableLayout)
Vue.component('singularity-button', Button)
Vue.component('singularity-dialog', Dialog)
Vue.component('singularity-tabs', Tabs)
Vue.component('singularity-form', Form)
Vue.component('singularity-table', Table)
Vue.component('singularity-echarts', Echarts)
Vue.component('singularity-upload', Upload)