import {writable} from "svelte/store"

export const pointerType = writable("unknown")

if (typeof window != undefined) {
    window.addEventListener("pointerdown", (e) => {
        pointerType.set(e.pointerType)
    })
}