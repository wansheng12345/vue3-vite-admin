//存储全局公共的数据
const usePublicStore = defineStore('public', {
    state: () => ({
        ColorList: ["#6be6c1","#ffb980","#07D2F9","#F19E34","#b6a2de","#96dee8","#e6a0d2","#afe8ff","#a5a3a2","#E9EDFF","#929ABA","#516b91","#59c4e6","#a5e7f0","#2ec7c9","#8d98b3","#95706d","#07a2a4","#588dd5"],
        facCode: '1020',//厂ID
        lang:localStorage.getItem("lang")??'zh',
    }),
    getters: {},
    actions: {},
})
export default usePublicStore