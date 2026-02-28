<script lang="ts">
    import Carousel from "./Corousel.svelte";

    const items = [
        {
            date: "April 2024",
            title: "1st Place",
            text: "Lomba Kompetensi Siswa Provinsi (LKS SMK) 2024",
            field: "IT Software Solution for Business",
            images: [
                "/lks-provinsi/IMG-20240426-WA0029.jpg",
                "/lks-provinsi/IMG-20240425-WA0003.jpg",
                "/lks-provinsi/IMG-20240426-WA0007(1).jpg",
            ],
        },
        {
            date: "August 2024",
            title: "Gold Medalist",
            text: "Lomba Kompetensi Siswa Nasional (LKS SMK) 2024",
            field: "IT Software Solution for Business",
            images: [
                "/lks-nasional/IMG-20240824-WA0078.jpg",
                "/lks-nasional/IMG-20240821-WA0082.jpg",
                "/lks-nasional/IMG-20240821-WA0086.jpg",
                "/lks-nasional/IMG-20240825-WA0001(1).jpg",
            ],
        },
        {
            date: "November 2024",
            title: "1st Place",
            text: "National Selection for WorldSkills Asean 2025",
            field: "IT Software Solution for Business",
            images: [
                "/seleknas/IMG-20241109-WA0015.jpg",
                "/seleknas/IMG_20241109_153800_740(1).jpg",
            ],
        },
        {
            date: "August 2025",
            title: "Gold Medalist",
            text: "WorldSkills Asean 2025 Manila",
            field: "IT Software Solution for Business",
            images: [
                "/worldskills-asean/IMG-20250829-WA0126.jpg",
                "/worldskills-asean/IMG-20250829-WA0037.jpg",
                "/worldskills-asean/IMG-20250829-WA0258.jpg",
                "/worldskills-asean/IMG-20250830-WA0107.jpg",
                "/worldskills-asean/IMG-20250903-WA0096.jpg",
                "/worldskills-asean/IMG-20250903-WA0115.jpg",
            ],
        },
        {
            date: "November 2025",
            title: "Bronze Medalist",
            text: "WorldSkills Asia 2025 Taipei",
            field: "Software Application Development",
            images: [
                "/worldskills-asia/IMG_20251202_160129_917.jpg",
                "/worldskills-asia/motion_photo_1473732990238573535.jpg",
                "/worldskills-asia/motion_photo_3055736531806078340.jpg",
                "/worldskills-asia/motion_photo_7863767579867776582.jpg",
                "/worldskills-asia/motion_photo_7898557460896107392.jpg",
            ],
        },
    ];
</script>

<div class="flex items-center justify-center">
    <div class="w-full max-w-6xl">
        <!-- desktop -->
        <div class="hidden lg:block">
            <!-- carousels -->
            <div class="flex justify-between mb-6 gap-1">
                {#each items as item}
                    <div class="flex-1">
                        <Carousel images={item.images} aspect="4/3" />
                    </div>
                {/each}
            </div>

            <!-- dates -->
            <div class="flex justify-between mb-2">
                {#each items as item}
                    <div
                        class="flex-1 text-center text-xs text-cs-dark tracking-widest"
                    >
                        {item.date}
                    </div>
                {/each}
            </div>

            <!-- dotted line -->
            <div class="relative flex items-center my-4">
                <div class="absolute inset-0 flex items-center">
                    <div
                        class="w-full border-t-2 border-dotted border-cs-dark"
                    ></div>
                </div>

                <div class="relative flex justify-between w-full">
                    {#each items as _, i}
                        <div class="flex-1 flex justify-center">
                            <div
                                class={`w-3 h-3 rounded-full border-2 border-cs-dark ${i === 10 ? "bg-cs-dark" : "bg-cs-light"}`}
                            ></div>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- text -->
            <div class="flex justify-between mt-2">
                {#each items as item}
                    <div class="flex-1 px-3 text-center">
                        <p
                            class="text-xs font-semibold text-gray-900 tracking-wide uppercase mb-1"
                        >
                            {item.title}
                        </p>
                        <p class="text-xs text-cs-dark leading-relaxed">
                            {item.text}
                        </p>
                        <p class="text-xs text-cs-dark leading-relaxed opacity-75">
                            {item.field}
                        </p>
                    </div>
                {/each}
            </div>
        </div>

        <!-- mobile -->
        <div class="lg:hidden relative">
            <div
                class="absolute left-4 top-0 bottom-0 w-px border-l-2 border-dotted border-cs-dark"
            ></div>

            <div class="space-y-10 pl-12">
                {#each items as item, i}
                    <div class="relative">
                        <div
                            class={`absolute -left-9.25 top-1 w-3 h-3 rounded-full border-2 border-cs-dark ${i === 10 ? "bg-cs-dark" : "bg-cs-light"}`}
                        ></div>

                        <p class="text-xs text-cs-dark tracking-widest mb-1">
                            {item.date}
                        </p>
                        <p
                            class="text-xs font-semibold text-cs-dark tracking-wide uppercase mb-2"
                        >
                            {item.title}
                        </p>

                        <div class="mb-2">
                            <Carousel images={item.images} aspect="16/9" />
                        </div>

                        <p class="text-xs text-cs-dark leading-relaxed">
                            {item.text}
                        </p>
                        <p class="text-xs text-cs-dark leading-relaxed opacity-75">
                            {item.field}
                        </p>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>
