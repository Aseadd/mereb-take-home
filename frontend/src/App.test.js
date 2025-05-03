import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import App from "./App.jsx";

// Mock gRPC modules
vi.mock("./ping_grpc_web_pb", async () => {
  const mockPing = vi.fn((request, metadata, callback) => {
    callback(null, { getMessage: () => request.getMessage() });
  });

  const mockPingServiceClient = vi.fn().mockImplementation(() => ({
    ping: mockPing,
  }));

  return {
    PingServiceClient: mockPingServiceClient,
  };
});

vi.mock("./ping_pb", async () => ({
  PingRequest: vi.fn().mockImplementation(() => {
    let message = "";
    return {
      setMessage: (msg) => {
        message = msg;
      },
      getMessage: () => message,
    };
  }),
}));

test("renders input and button, handles ping", async () => {
  render(<App />);

  // Wait for gRPC client to be initialized
  const button = await screen.findByText("Send Ping");

  // Find input and type into it
  const input = screen.getByPlaceholderText("Enter a message");
  fireEvent.change(input, { target: { value: "Test" } });

  expect(input.value).toBe("Test");

  // Click the button
  fireEvent.click(button);

  // Wait for the response text
  const response = await screen.findByText("Response: Test");
  expect(response).toBeInTheDocument();
});
