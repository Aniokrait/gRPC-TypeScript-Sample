import * as grpc from '@grpc/grpc-js';
import { GreeterService } from '../generate/greeter_grpc_pb';
import { GreeterServer } from './greeterServer';

//サーバーを起動する。
function main() {
  const server = new grpc.Server();
  server.addService(GreeterService, new GreeterServer());
  //本番運用するときはTLSで通信するべきなので、createInsecure()ではなくcreateSsl()を使う
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('Server started on port 50051');
  });
}

main();