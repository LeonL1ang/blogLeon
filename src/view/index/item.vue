<template>
    <Row>
        <Col class="article" span="16">
            <Card :bordered="false">
                <p slot="title">标题，我今天说什么</p>
                <p>今天学习了view和vue</p>
                <p>2012年8月11日</p>
            </Card>
        </Col>
        <Col class="article" span="16">
            <Card :bordered="false">
                <p slot="title">标题，我今天说什么</p>
                <p>今天学习了view和vue</p>
                <p>2012年8月11日</p>
            </Card>
        </Col>
    </Row>
</template>
<script>
export default {
    
}
</script>

<style scoped>
.article {
    margin-bottom: 25px;
}
</style>
