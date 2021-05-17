<template>
    <div class="Counter">
        <input class="Value input input--border"
            type="number"
            min="0"
            max="9999"
            disabled
            :value="counter.value"/>
        <button class="button button--primary"
            @click="counter.increment()">
            Increment
        </button>
        <button class="button button--white"
            @click="counter.reset()">
            Reset
        </button>
    </div>
</template>

<script>
export default {

    inject: [
        'counter'
    ]

}
</script>

<style scoped>
.Counter {
    display: flex;
    align-items: center;
    gap: var(--sp2);
}

.Value {

}
</style>
