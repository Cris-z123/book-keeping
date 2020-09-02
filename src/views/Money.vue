<template>
    <Layout class-prefix="layout">
        <NumberPad></NumberPad>
        <Types></Types>
        <Notes></Notes>
        <Tags></Tags>
    </Layout>
</template>

<script lang="ts">
    import NumberPad from '@/components/money/NumberPad.vue';
    import Types from '@/components/money/Types.vue';
    import Tags from '@/components/money/Tags.vue';
    import Notes from '@/components/money/Notes.vue';

    export default {
        name: 'Money',
        components: {Notes, Types, NumberPad, Tags}
    }
</script>

<style lang="scss">
.layout-content {
    display: flex;
    flex-direction: column-reverse;
}
</style>