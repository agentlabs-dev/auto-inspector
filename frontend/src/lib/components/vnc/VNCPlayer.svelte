<script lang="ts">
  import { onMount } from "svelte";

  export let sessionUrl: string;
  export let password: string;

  let vncContainer: HTMLDivElement | null = null;
  let RFB: any;
  let rfb: any; // Store the RFB connection object
  let status: 'connected' | 'connecting' | 'disconnected' = 'connecting';

  onMount(async () => {
    if (typeof window !== "undefined") {
      try {
        console.log("Loading noVNC...");
        const noVNC = await import("novnc-core");
        RFB = noVNC.default;

        const url = `ws://localhost:6080/websockify`; // WebSocket for VNC

        console.log("Connecting to VNC...");
        rfb = new RFB(vncContainer, url, {
          credentials: { password: "secret" }, // Set password if required
        });

        (rfb as any).scaleViewport = true; // Auto-scale the VNC screen
        (rfb as any).clipViewport = true;

        console.log("Setting background color to white", rfb);
        (rfb as any).background = "#fff"; // Set background color

        status = 'connecting';

        // Debugging: Listen for connection events
        (rfb as any).addEventListener("connect", () => {
          console.log("✅ VNC Connected!");
          status = 'connected';
        });
        (rfb as any).addEventListener("disconnect", (e: any) => {
          console.log("❌ VNC Disconnected!", e);
          status = 'disconnected';
        });

      } catch (error) {
        console.error("❌ Failed to load noVNC", error);
      }
    }
  });

  function disconnect() {
    if (rfb) {
      (rfb as any).disconnect();
      console.log("VNC Disconnected.");
    }
  }
</script>

<style>
  .aspect-ratio-box {
    position: relative;
    width: 100%;
    padding-top: calc(900 / 1440 * 100%); /* Aspect ratio: 900/1440 */
  }

  .vnc-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>

<div class="aspect-ratio-box">
  <div bind:this={vncContainer} class="vnc-container bg-white border border-gray-200 rounded-lg flex flex-col items-center justify-center">
  </div>
</div>
