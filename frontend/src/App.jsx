import { useState, useEffect } from "react";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [grpcClient, setGrpcClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Starting gRPC module import...");
    Promise.all([import("./ping_pb"), import("./ping_grpc_web_pb")])
      .then(([pingPb, pingGrpcWebPb]) => {
        console.log("gRPC modules loaded successfully:", {
          pingPbKeys: Object.keys(pingPb),
          hasPingRequest: !!pingPb.PingRequest,
          pingGrpcWebPbKeys: Object.keys(pingGrpcWebPb),
          hasPingServiceClient: !!pingGrpcWebPb.PingServiceClient,
        });
        if (!pingPb.PingRequest) {
          throw new Error("PingRequest not defined in pingPb");
        }
        if (!pingGrpcWebPb.PingServiceClient) {
          throw new Error("PingServiceClient not defined in pingGrpcWebPb");
        }
        const client = new pingGrpcWebPb.PingServiceClient(
          "http://localhost:8081",
          null,
          null
        );
        setGrpcClient({ client, PingRequest: pingPb.PingRequest });
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load gRPC modules:", {
          name: err.name,
          message: err.message,
          stack: err.stack,
        });
        setResponse("Error: Failed to initialize gRPC client");
        setIsLoading(false);
      });
  }, []);

  const handlePing = () => {
    if (!grpcClient) {
      setResponse("Error: gRPC client not initialized");
      return;
    }
    const { client, PingRequest } = grpcClient;
    const request = new PingRequest();
    request.setMessage(input);
    client.ping(request, {}, (err, res) => {
      if (err) {
        console.error("gRPC ping error:", err);
        setResponse("Error: " + err.message);
        return;
      }
      setInput("");
      setResponse(res.getMessage());
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Ping App</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a message"
        className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      />
      <button
        onClick={handlePing}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Send Ping"}
      </button>
      {response && (
        <p className="mt-4 text-center text-gray-700">Response: {response}</p>
      )}
    </div>
  );
}

export default App;
