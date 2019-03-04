<template>
<Row style="margin-top:100px;">
    <Col span="8" offset=8>
        <Spin size="large" fix v-if="isLoading"></Spin>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="邮箱：" prop="email">
                <Input v-model="formValidate.email" placeholder=""></Input>
            </FormItem>         
            <FormItem label="密码：" prop="password">
                <Input type="password" v-model="formValidate.password" placeholder=""></Input>
            </FormItem>   
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">登录</Button>
                <Button @click="breakPage" style="margin-left: 8px">返回</Button>
            </FormItem>
        </Form>
    </Col>
</Row>
</template>
<script>
    export default {
        inject: ['reloadHeaderLogin'],
        data () {
            return {
                isLoading: false,
                formValidate: {
                    email: '',
                    password: '',
                },
                ruleValidate: {
                    email: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // this.$Message.success('Success!');
                        this.isLoading = true
                        this.$http.post('/auth/user/login', {
                            email: this.formValidate.email,
                            password: this.formValidate.password
                        }).then((res) => {       
                            res = res.data                     
                            this.isLoading = false
                            if(res.code === 2000){
                                // 还需要保存token
                                // 根据store中set_token方法将token保存至localStorage/sessionStorage中，data["Authentication-Token"]，获取token的value值
                                this.$store.commit('ADD_COUNT', res.data)
                                this.reloadHeaderLogin()
                                this.$router.push('/')
                            } else{
                                this.$Message.error(res.message + '')
                            }                     
                        }).catch((error) => {
                            this.isLoading = false
                            this.$Message.error(error + '')
                        })
                    } else {
                         // this.$Message.error('Fail!');
                    }
                })
            },
            breakPage () {                
                this.$router.back(-1)
            }
        }
    }
</script>
