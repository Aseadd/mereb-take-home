import pytest
import grpc
import ping_pb2
import ping_pb2_grpc

def test_ping():
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = ping_pb2_grpc.PingServiceServicerStub(channel)
        response = stub.Ping(ping_pb2.PingRequest(message="Hello"))
        assert response.message == "Hello"