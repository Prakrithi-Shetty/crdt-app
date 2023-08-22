import React, { useRef } from "react";
import * as Y from "yjs";
import { MonacoBinding } from "y-monaco";
import Editor from "@monaco-editor/react";
import { WebsocketProvider } from "y-websocket";

function App() {
  const editorRef = useRef(null);
  // const yDocRef = useRef(null); // Reference to Y.Doc instance
  // const wsRef = useRef(null); // Reference to WebSocket connection

  // Editor value -> YJS Text value (A text value shared by multiple people)
  // One person deletes text -> Deletes from the overall shared text value
  // Handled by YJS

  // Initialize YJS, tell it to listen to our Monaco instance for changes.

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;


    // Initialize YJS
    const doc = new Y.Doc();
    // yDocRef.current = doc; // Store the Y.Doc instance in the ref

     // Initialize WebSocket connection
    //  const ws = new WebSocket("ws://192.168.0.37:3001");
    //  wsRef.current = ws; // Store the WebSocket instance in the ref
 
    //  ws.onopen = () => {
    //    console.log("WebSocket connection established.");
    //    ws.send("Hello, server!"); // Send a message to the server after connection
    //  };
 
    //  ws.onmessage = (event) => {
    //    console.log("Received message from server:", event.data);
    //  };

     
    // Initialize YJS
    // Connect to peers (or start connection) with WebRTC
    // const provider = new WebrtcProvider("test-room", doc); // room1, room2
    // const provider = new WebrtcProvider("webrtc-test", doc, {
    //   signaling: ["ws://localhost:4444"],
    // });
    const provider = new WebsocketProvider('wss://crdt-server-go6r6w663-prakrithi-shetty.vercel.app', 'my-roomname', doc);
    const type = doc.getText("monaco"); // doc { "monaco": "what our IDE is showing" }
    // Bind YJS to Monaco
    const binding = new MonacoBinding(
      type,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      provider.awareness
    );


  }

  return (
    <Editor
      height="100vh"
      width="100vw"
      // theme="vs-dark"
      onMount={handleEditorDidMount}
    />
  );
}

export default App;