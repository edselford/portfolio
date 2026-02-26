<script lang="ts">
    import {
        faAngleRight,
        faAngleLeft,
    } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import { onMount } from "svelte";

    export let images: string[] = [];
    export let aspect = "4/3";

    let index = 0;

    function next() {
        index = (index + 1) % images.length;
    }

    function prev() {
        index = (index - 1 + images.length) % images.length;
    }

    let pointerType = "unknown";
    onMount(() => {
        if (window.matchMedia("(pointer: coarse)").matches) {
            pointerType = "touch";
        } else if (window.matchMedia("(pointer: fine)").matches) {
            pointerType = "mouse";
        }
        const handler = (e: PointerEvent) => {
            pointerType = e.pointerType;
        };

        window.addEventListener("pointerdown", handler);

        return () => window.removeEventListener("pointerdown", handler);
    });
</script>

<div
    class="group relative overflow-hidden rounded border border-cs-dark bg-cs-dark max-w-[300px]"
    style={`aspect-ratio:${aspect};`}
>
    <div
        class={`flex h-full transition-transform duration-500 ease-in-out ${pointerType == "mouse" ? "group-hover:grayscale-0 grayscale" : ""}`}
        style={`transform: translateX(-${index * 100}%);`}
    >
        {#each images as img}
            <div class="min-w-full h-full">
                <img src={img} class="w-full h-full object-cover" alt="" />
            </div>
        {/each}
    </div>

    <div
        class={pointerType == "mouse"
            ? "group-hover:opacity-100 opacity-0 duration-300"
            : ""}
    >
        <button
            on:click={prev}
            class="absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 bg-cs-light border border-cs-light rounded-full text-cs-dark flex items-center justify-center text-xs opacity-75 cursor-pointer duration-300 hover:opacity-100"
            ><Fa icon={faAngleLeft} /></button
        >

        <button
            on:click={next}
            class="absolute right-1 top-1/2 -translate-y-1/2 w-5 h-5 bg-cs-light border border-cs-light rounded-full text-cs-dark flex items-center justify-center text-xs opacity-75 cursor-pointer duration-300 hover:opacity-100"
            ><Fa icon={faAngleRight} /></button
        >

        <!-- dots -->
        <div class="absolute bottom-1 left-0 right-0 flex justify-center gap-1">
            {#each images as _, i}
                <span
                    class={`w-1 h-1 rounded-full bg-cs-light ${i === index ? "opacity-100" : "opacity-50"}`}
                ></span>
            {/each}
        </div>
    </div>
</div>
