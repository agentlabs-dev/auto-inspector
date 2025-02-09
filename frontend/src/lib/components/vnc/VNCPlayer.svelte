<script>
  import { onMount } from "svelte";

  let vncContainer;
  let RFB;
  let rfb; // Store the RFB connection object

  onMount(async () => {
    if (typeof window !== "undefined") {
      try {
        console.log("Loading noVNC...");
        const noVNC = await import("novnc-core");
        RFB = noVNC.default;

        const url = "ws://localhost:6080/websockify"; // WebSocket for VNC

        console.log("Connecting to VNC...");
        rfb = new RFB(vncContainer, url, {
          credentials: { password: "secret" }, // Set password if required
        });

        rfb.scaleViewport = true; // Auto-scale the VNC screen
        rfb.clipViewport = true;
        rfb.background = "#000"; // Set background color

        // Debugging: Listen for connection events
        rfb.addEventListener("connect", () => console.log("✅ VNC Connected!"));
        rfb.addEventListener("disconnect", (e) => console.log("❌ VNC Disconnected!", e));

      } catch (error) {
        console.error("❌ Failed to load noVNC", error);
      }
    }
  });

  function disconnect() {
    if (rfb) {
      rfb.disconnect();
      console.log("VNC Disconnected.");
    }
  }
</script>

<div bind:this={vncContainer} style="width: 100%; height: 600px; background: black;"></div>
<button on:click={disconnect}>Disconnect</button>
