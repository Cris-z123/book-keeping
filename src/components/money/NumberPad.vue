<template>
    <div class="numberPad">
            <div class="output">{{output}}</div>
            <div class="buttons">
                <button @click="inputContent">1</button>
                <button @click="inputContent">2</button>
                <button @click="inputContent">3</button>
                <button @click="remove" class="back"><Icon name="back"></Icon></button>
                <button @click="inputContent">4</button>
                <button @click="inputContent">5</button>
                <button @click="inputContent">6</button>
                <button @click="inputContent" class="zero">0</button>
                <button @click="inputContent">7</button>
                <button @click="inputContent">8</button>
                <button @click="inputContent">9</button>
                <button @click="inputContent" class="point">.</button>
                <button @click="clear" class="empty">清空</button>
                <button @click="ok" class="ok">确定</button>
            </div>
        </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';

    @Component
    export default class NumberPad extends Vue{
        @Prop(Number) readonly value!: number;
        output = this.value.toString();

        inputContent(event: MouseEvent){
            const button = (event.target as HTMLButtonElement);
            const input =  button.textContent as string;

            if(this.output.length === 16) {
                return;
            }
            if(this.output === '0') {
                if('0123456789'.indexOf(input) >= 0) {
                    this.output = input;
                } else {
                    this.output += input;
                }
                return;
            }
            if(this.output.indexOf('.') >= 0 && input === '.') {
                return; 
            }
            this.output += input;
        }
        remove() {
            if(this.output.length === 1) {
                this.output = '0';
            } else {
                this.output = this.output.slice(0, -1);
            }
        }
        clear() {
            this.output = '0';
        }
        ok() {
            const number = parseFloat(this.output)
            this.$emit('update:value', number);
            this.$emit('submit', number);
            this.output = '0';
        }
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberPad {
    .output {
        height: 64px;
        font-size: 46px;
        font-family: Consolas, monospace;
        background: #fff;
        padding: 0 16px;
        text-align: right;
        box-shadow: inset 0 -3px 3px -3px fade_out(black, 0.6), 
                    inset 0 3px 3px -3px fade_out(black, 0.6);
    }
    .buttons {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        > button {
            width: 20%;
            height: 54px;
            background: transparent;
            border: none;
            font-size: 20px;
            font-weight: 500;
            margin: 6px;
            &.back {
                font-size: 40px;
                width: 26%;
                vertical-align: middle;
            }
            &.empty {
                width: 23*2%;
            }
            &.ok {
                width: 23*2%;
            }
            &.zero {
               width: 26%;
            }
            &.point {
                width: 26%;
                font-size: 30px;
                font-weight: bold;
            }
            $bg: #eee;
            & {
                background: $bg;
                box-shadow: -2px -2px 5px white, 3px 3px 5px rgba(0, 0, 0, 0.1);
                border-radius: 10px;
            }
        }
    }
}
</style>