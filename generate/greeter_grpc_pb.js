// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var greeter_pb = require('./greeter_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_greet_HelloReply(arg) {
  if (!(arg instanceof greeter_pb.HelloReply)) {
    throw new Error('Expected argument of type greet.HelloReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_greet_HelloReply(buffer_arg) {
  return greeter_pb.HelloReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_greet_HelloRequest(arg) {
  if (!(arg instanceof greeter_pb.HelloRequest)) {
    throw new Error('Expected argument of type greet.HelloRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_greet_HelloRequest(buffer_arg) {
  return greeter_pb.HelloRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var GreeterService = exports.GreeterService = {
  sayHello: {
    path: '/greet.Greeter/SayHello',
    requestStream: false,
    responseStream: false,
    requestType: greeter_pb.HelloRequest,
    responseType: greeter_pb.HelloReply,
    requestSerialize: serialize_greet_HelloRequest,
    requestDeserialize: deserialize_greet_HelloRequest,
    responseSerialize: serialize_greet_HelloReply,
    responseDeserialize: deserialize_greet_HelloReply,
  },
};

exports.GreeterClient = grpc.makeGenericClientConstructor(GreeterService);
