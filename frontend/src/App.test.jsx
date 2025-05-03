import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import App from "./App.jsx";

// Mocks
vi.mock("./ping_grpc_web_pb", () => {
  const mockPingServiceClient = vi.fn().mockImplementation(() => ({
    ping: vi.fn((request, metadata, callback) => {
      callback(null, { getMessage: () => request.getMessage() });
    }),
  }));
  return { PingServiceClient: mockPingServiceClient };
});

vi.mock("./ping_pb", () => ({
  PingRequest: vi.fn().mockImplementation(() => ({
    setMessage: vi.fn(),
    getMessage: vi.fn(() => "Test"),
  })),
}));

describe("Ping App", () => {
  test("send button is enabled after input", async () => {
    render(<App />);

    // Wait for the button to change from "Loading..." to "Send Ping"
    const button = await screen.findByText("Send Ping");

    const input = screen.getByPlaceholderText("Enter a message");
    fireEvent.change(input, { target: { value: "Hello" } });

    expect(button).not.toBeDisabled();
  });

  test("sends ping and shows response", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Enter a message");
    const button = await screen.findByText("Send Ping");

    fireEvent.change(input, { target: { value: "Test" } });
    fireEvent.click(button);

    // wait for the mocked response text to appear (depends on your gRPC mock)
    await waitFor(() =>
      expect(screen.getByText(/Response:/)).toBeInTheDocument()
    );
  });

  test("updates response after new ping", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Enter a message");
    const button = await screen.findByText("Send Ping");

    fireEvent.change(input, { target: { value: "First" } });
    fireEvent.click(button);

    await waitFor(() =>
      expect(screen.getByText(/Response:/)).toBeInTheDocument()
    );

    fireEvent.change(input, { target: { value: "Second" } });
    fireEvent.click(button);

    await waitFor(() =>
      expect(screen.getByText(/Response:/)).toBeInTheDocument()
    );
  });
});
