<template>
    <div style="background:#eee;padding:20px">
        <Row type="flex" justify="start" class="code-row-bg">
            <Col span="6"></Col>
            <Col span="18">
                <Spin size="large" fix v-if="false"></Spin>
                <article-item/>
                <Page :total="100" show-sizer/>
            </Col>
        </Row>
    </div>
</template>
<style scoped>
.code-row-bg{
    min-height: 800px;
}
</style>
<script>
import articleItem from './view/index/item.vue'
export default {
    components: {
        articleItem
    }
}
</script>

