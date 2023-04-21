import * as grpc from '@grpc/grpc-js';
import { GreeterClient } from '../generate/greeter_grpc_pb';
import { HelloRequest } from '../generate/greeter_pb';

function main() {
  const client = new GreeterClient('localhost:50051', grpc.credentials.createInsecure());

  const request = new HelloRequest();

  client.sayHello(request, (error, response) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      console.log(`error.name: ${error.name}`)
      console.log(`error.message: ${error.message}`)
      console.log(`error.stack: ${error.stack}`)
    } else {
      console.log(`Greeting: ${response.getMessage()}`);
      const encodedString = response.getEncodedString() as Uint8Array;
      const resStr = convertByte2String(encodedString);
      console.log(`bytes型のレスポンス: ${resStr}`);
    }
  });
}

function convertByte2String(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes)
}

main();