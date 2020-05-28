<template>
    <div id="BackHeader">
        <header>
            <div id="BG" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </header>
    
    </div>
</template>

<script>
export default {
    name: 'BackHeader',
    data() {
        return {}
    },
    methods: {

    },
    mounted() {

    },
    components: {

    }
}
</script>
<style scoped>
#BG {
    position: absolute;
    width: 100%;
    height: 75%;
    overflow: hidden;
    background: linear-gradient(150deg, #53f 15%, #05d5ff 70%, #a6ffcb 94%);
    transform: skewY(15deg);
    transform-origin: right;
}

#BG :nth-child(1) {
    width: calc(100% /5);
    background-color: #409eff;
    height: 190px;
    top: 55%;
    right: 0;
}

#BG :nth-child(2) {
    width: calc(100% /3);
    background-color: #409eff;
    height: 190px;
    right: calc(calc(100% / 3) / 2*-1);
}

#BG :nth-child(3) {
    width: calc(100% /3);
    background-color: #53f;
    height: 190px;
    right: calc(calc(100% / 3) / 2);
}

#BG span {
    position: absolute;
}
</style>
