<script lang="ts">
    import TestBuilder from "$lib/components/TestBuilder.svelte";
	import VncPlayer from "$lib/components/vnc/VNCPlayer.svelte";
	import { triggerTestRun } from "../services/backend-service";
    import {subscribeToRunUpdates, currentRunStore} from "$lib/stores/run";
    import RunGraph from "$lib/components/run-graph/RunGraph.svelte";
	import type { Run } from "$lib/entities/run";
    let isLoading = $state(false);
    let sessionUrl = $state<string | null>(null);
    let password = $state<string | null>(null);

    /**
     * This is a POC, we'll improve that later.
     */
    const generate = async ({startUrl, scenario}: {startUrl: string, scenario: string}) => {
        isLoading = true;
        const result = await triggerTestRun(startUrl, scenario);    

        sessionUrl = result.sessionUrl;
        password = result.password;
    }

    const resetSession = () => {
        sessionUrl = null;
        password = null;
        isLoading = false;
    }

    const subscribe = () => {
        subscribeToRunUpdates();
    }    
</script>

<div class="min-h-screen flex flex-col items-center justify-center">
    <button on:click={subscribe}>Subscribe</button>

    <div class="w-[500px] h-[1000px]">
        {#if $currentRunStore}
            <RunGraph run={$currentRunStore} />
        {/if}
    </div>
    {#if sessionUrl && password}
        <div class="w-4xl flex items-center justify-center">
            <VncPlayer sessionUrl={sessionUrl} password={password} onDisconnect={resetSession} onConnect={() => {}}/>
        </div>        
    {:else}
        <TestBuilder onTriggerRun={generate}/>    
    {/if}
</div>