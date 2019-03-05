<template>
    <div>
        <Menu @on-select="menuSelect" mode="horizontal" theme="dark" active-name="1">
            <MenuItem name="/">
                <Icon type="ios-paper" />
                首页
            </MenuItem>
            <MenuItem name="/article/edit">
                <Icon type="ios-people" />
                编写博客
            </MenuItem>
            <Submenu v-show="isLoginShow" name="3">
                <template slot="title">
                    <Icon type="ios-stats" />
                    未登录
                </template>
                <MenuGroup title="使用">
                    <MenuItem name="/login">登录</MenuItem>
                    <MenuItem name="/register">注册</MenuItem>
                </MenuGroup>
            </Submenu>
            <Submenu v-show="isUserShow" name="4">
                <template slot="title">
                    <Icon type="ios-stats" />
                    {{ name }}
                </template>
                <MenuGroup title="使用">
                    <MenuItem name="/user/article"> 我的博客 </MenuItem>
                    <MenuItem name="/user/collection"> 收藏 </MenuItem>
                    <MenuItem name="/user/logout"> 注销 </MenuItem>
                </MenuGroup>
            </Submenu>
        </Menu>
    </div>
</template>
<script>
    export default {        
        data () {            
            return {
                name: '',
                isLoginShow: true,
                isUserShow: false                
            }
        },        
        created() {
            this.$http(
                '/auth/user/getInfo'
            ).then(res => {
                res = res.data
                if(res.code == 2000){
                    // 已登录
                    this.name = res.data.name
                    this.isLoginShow = false
                    this.isUserShow = true
                }else{
                    // 未登录
                }
            })
        },
        methods: {
            menuSelect(name){
                if(name === "/user/logout"){
                    this.$store.commit('REMOVE_COUNT')                    
                    this.isLoginShow = true
                    this.isUserShow = false
                    this.name = ''
                }else{
                    this.$router.push(name)
                }
                this.$emit('eventMenuChange', name)
            }
        }
    }
</script>