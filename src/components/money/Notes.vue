<template>
    <div>
        <label class="notes">
            <span class="name">备注</span>
             <input type="text" placeholder="请输入备注">
        </label>
    </div>
</template>

<script>
    export default {
        name: 'Notes'
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.notes {
    display: block;
    display: flex;
    align-items: center;
    padding: 16px 0;
    font-size: 14px;
    background: #f5f5f5;
    .name {
        padding: 16px;
    }
    input {
        height: 64px;
        flex-grow: 1;
        background: transparent;
        border: none;
        padding-right: 16px;
    }
}
</style>