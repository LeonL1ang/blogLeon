<template>
    <Row style="padding-bottom:50px;">
        <Col span="2">.</Col>
        <Col style="margin-top:30px" span="20">
            <h3>标题：</h3>            
            <Input v-model="title" placeholder="请输入。。。" style="width: 500px; margin-bottom:20px;" />
            <h3>内容：</h3>        
            <mavon-editor @imgAdd="$imgAdd" v-model="context" style="min-height:600px;margin-bottom:20px;" />
            <Button type="primary" :loading="loading" @click="toLoading">
                <span v-if="!loading">保存</span>
                <span v-else>上传中...</span>
            </Button>
        </Col>
        <Col span="2">.</Col>
    </Row>
</template>
<style scoped>
</style>
<script>
export default {
    data(){ 
        return {
            loading: false,
            title:'',
            context: '',//输入的数据
            toolbars: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                mark: true, // 标记
                superscript: true, // 上角标
                quote: true, // 引用
                ol: true, // 有序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                help: true, // 帮助
                code: true, // code
                subfield: true, // 是否需要分栏
                fullscreen: true, // 全屏编辑
                readmodel: true, // 沉浸式阅读
                /* 1.3.5 */
                undo: true, // 上一步
                trash: true, // 清空
                save: true, // 保存（触发events中的save事件）
                /* 1.4.2 */
                navigation: true // 导航目录
            }
        }
    },
    methods: {
        toLoading (){
            let subtitle = this.title.trim()
            if(subtitle === ''){
               this.$Message.error('请输入标题')
               return
            }
            let article = this.context.trim()
            if(article === ''){                
               this.$Message.error('请输入内容')
               return
            }            
            // 按钮进入loading
            this.loading = true
            this.$http({
                url: '/article/save',
                data:{
                    title: subtitle,
                    content: article
                }
            }).then( res => {      
                // 取消按钮loading          
                this.loading = false
            }).catch(err => {                
               this.$Message.error(err + '')
            })
        },
          // 绑定@imgAdd event
        $imgAdd(pos, $file){
            // 第一步.将图片上传到服务器.
           var formdata = new FormData();
           formdata.append('image', $file);
           this.$http({
               url: '/file/upload',
               method: 'post',
               data: formdata,
               headers: { 'Content-Type': 'multipart/form-data' },
           }).then((url) => {
               // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
               // $vm.$img2Url 详情见本页末尾
               $vm.$img2Url(pos, url);
           }).catch(err => {
               this.$Message.error(err + '')
           })
        }
    }
}
</script>

