import { io } from "socket.io-client";

// Dynamically use the current machine's hostname/IP so this works on any network
// without needing to hardcode an IP address.
export const socket = io(`http://${window.location.hostname}:3005`);