import * as grpc from '@grpc/grpc-js';
import { GreeterClient } from '../generate/greeter_grpc_pb';
import { HelloRequest } from '../generate/greeter_pb';

function main() {
  const client = new GreeterClient('localhost:50051', grpc.credentials.createInsecure());

  const request = new HelloRequest();
  request.setName('World');

  client.sayHello(request, (error, response) => {
    if (error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.log(`Greeting: ${response.getMessage()}`);
    }
  });
}

main();