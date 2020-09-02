<template>
    <div>
        <ul class="types">
            <li class="selected">支出</li>
            <li>收入</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Types'
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.types {
    display: flex;
    background: #c4c4c4;
    text-align: center;
    font-size: 24px;
    > li {
        display: flex;
        width: 50%;
        line-height: 64px;
        justify-content: center;
        align-items: center;
        position: relative;
        &.selected::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: #333;
        }
    }
}
</style>