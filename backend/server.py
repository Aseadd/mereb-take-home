import grpc
from concurrent import futures
import ping_pb2
import ping_pb2_grpc

class PingServiceServicer(ping_pb2_grpc.PingServiceServicer):
    def Ping(self, request, context):
        return ping_pb2.PingResponse(message=request.message)

def serve():
    server = grpc.server(
        futures.ThreadPoolExecutor(max_workers=10),
        options=[
            ('grpc.http2', 1), 
            ('grpc.so_reuseport', 1),
            ('grpc.keepalive_time_ms', 10000)
        ]
    )
    ping_pb2_grpc.add_PingServiceServicer_to_server(PingServiceServicer(), server)
    server.add_insecure_port('[::]:50051')  
    print("Server started on port 50051")
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()