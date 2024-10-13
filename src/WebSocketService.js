// WebSocketService.js
let socket;

export const connectWebSocket = (url, onMessage) => {
  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log("WebSocket connection established");
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (!data || typeof data.motorId === 'undefined') {
        console.error("Invalid data received:", data);
        return;
      }
      
      // Call the provided onMessage function
      onMessage(data); // Ensure that this function correctly handles updating motorData
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
};

export const disconnectWebSocket = () => {
  if (socket) {
    socket.close();
  }
};
