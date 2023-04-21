import * as grpc from "@grpc/grpc-js";
import { IGreeterServer } from "../generate/greeter_grpc_pb";
import { HelloRequest, HelloReply } from "../generate/greeter_pb";
//実態は「node_modules/@types/google-protobuf/google/protobuf/timestamp_pb.d.ts」にある
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";

//protoで定義したServiceを実装するクラス定義。
export class GreeterServer implements IGreeterServer {
    [name: string]: grpc.UntypedHandleCall;
    sayHello(call: grpc.ServerUnaryCall<HelloRequest, HelloReply>, callback: grpc.sendUnaryData<HelloReply>): void {
        const reply = new HelloReply();
        reply.setMessage('Hello ' + call.request.getName());

        setCurrentTimestamp(reply);
        setBytes(reply);
        
        //メタデータをセットする
        const metadata = new grpc.Metadata();
        metadata.add("id", "hogehoge");

        const metadata2 = new grpc.Metadata();
        metadata2.add("id2", "fugafuga");

        if(call.request.getName() === 'nobody'){
            callback({
                code: grpc.status.NOT_FOUND,
                details: "誰でもない",
                metadata: metadata,
            }, null, metadata2);
        }else{
            //第一引数がエラーオブジェクト。第二引数がレスポンスオブジェクト。
            //第三引数がメタデータ
            callback(null, reply, metadata);
        }
    }
}

function setCurrentTimestamp(reply: HelloReply) {
    //現在日時を取得し、epoch秒に変換する
    const currentDate = new Date();
    let currentTime = new Timestamp();
    currentTime.setSeconds(Math.floor(currentDate.getTime() / 1000));
    reply.setCurrentTime(currentTime);
}

function setBytes(reply: HelloReply) {
    //文字列をエンコードしバイト配列(Uint8Array)を得る
    const byteMessage = new TextEncoder().encode("ABCDEFG");
    console.log(byteMessage);
    reply.setEncodedString(byteMessage);
}