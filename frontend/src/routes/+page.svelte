<script lang="ts">
	import VncPlayer from "$lib/components/vnc/VNCPlayer.svelte";
	import { triggerTestRun } from "../services/backend-service";

    let userStory = '';

    $: hasUserStory = userStory.length > 0;

    let sessionUrl: string | null = null;
    let password: string | null = null;

    /**
     * This is a POC, we'll improve that later.
     */
    const generate = async () => {
        console.log('generate');
        const result = await triggerTestRun('https://google.com', userStory);
        await new Promise(resolve => setTimeout(resolve, 1500));
        sessionUrl = result.sessionUrl;
        password = result.password;
    }

    const placeholder = `As a user on Amazon, when I search for "laptop", I should see a list of laptops.`;
</script>

<div class="min-h-screen">

    <div class="h-full w-3xl mx-auto flex flex-col justify-between">
        <div class="flex flex-col">
            {#if sessionUrl && password}
                <VncPlayer sessionUrl={sessionUrl} password={password} />
            {/if}
        </div>

        <div class="flex flex-col space-y-5 py-10">        
            <div class="mb-10">
                <h1 class="text-2xl font-semibold text-center">What test do you want to perform?</h1>
            </div>

            <div class="rounded-md border-gray-200 p-4 max-w-md bg-white">
                <p>
                    As a user on Amazon, when I search for "laptop", I should see a list of laptops.
                </p>
            </div>

            <div class="flex w-full cursor-text flex-col rounded-3xl border border-gray-200 shadow-sm px-4 py-1">
                <textarea placeholder={placeholder}
                    bind:value={userStory}
                class="block h-10 w-full resize-none bg-transparent px-0 py-2 border-none focus:outline-none">            
                </textarea>
    
                <div class="flex justify-end pb-2">
                    <button disabled={!hasUserStory} on:click={generate} aria-label="Generate" class="bg-gray-900 text-white px-4 py-2 rounded-full cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 17a1 1 0 01-1-1V5.414L5.707 8.707a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L11 5.414V16a1 1 0 01-1 1z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>       
    </div>
</div>