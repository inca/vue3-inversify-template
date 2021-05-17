<template>
    <div class="Home">
        <article class="Content">
            <h2>Vue 3 + Inversify template</h2>
            <p>
                This is a template that shows how to wire Vue 3 and Inversify,
                with strong emphasis on separating business logic from view layer.
            </p>
            <p>
                Here's a stereotypical counter with persistence layer:
            </p>
            <Counter/>
            <p>
                Please refer to README for more information. Have fun!
            </p>
        </article>
    </div>
</template>

<style scoped>
.Home {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: var(--color-blueGray--200);
}

.Content {
    max-width: 480px;
    padding: var(--sp4);
    background: var(--background);
    border-radius: var(--border-radius);
    box-shadow: 0 1px 3px rgba(0,0,0,.15);
}
</style>
