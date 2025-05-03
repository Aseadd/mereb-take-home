import pytest
import grpc
import ping_pb2
import ping_pb2_grpc

def test_ping():
    # Connect to the running gRPC server
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = ping_pb2_grpc.PingServiceStub(channel)  # <-- FIXED NAME
        request = ping_pb2.PingRequest(message="Hello")
        response = stub.Ping(request)
        assert response.message == "Hello"
