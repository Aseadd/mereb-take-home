import * as grpcWeb from 'grpc-web';

import * as ping_pb from './ping_pb';


export class PingServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  ping(
    request: ping_pb.PingRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: ping_pb.PingResponse) => void
  ): grpcWeb.ClientReadableStream<ping_pb.PingResponse>;

}

export class PingServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  ping(
    request: ping_pb.PingRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<ping_pb.PingResponse>;

}

