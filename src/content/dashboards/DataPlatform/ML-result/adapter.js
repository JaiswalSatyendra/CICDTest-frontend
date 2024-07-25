import { Adapter, StreamingAdapterObserver } from '@nlux/react';

//const demoProxyServerUrl = 'http://54.84.56.97/chat/';
const demoProxyServerUrl = 'http://54.84.56.97:80/chat';
//const demoProxyServerUrl = 'https://demo.api.nlux.ai/openai/chat/stream';

export const streamAdapter: Adapter = {

  streamText: async (prompt: string, observer: StreamingAdapterObserver) => {
    let userId = localStorage.getItem("selectedUser_Id");
    let projectId = localStorage.getItem("selectedProjectId");
    let projectName = localStorage.getItem("selectedProjectName");
    let url = userId + "/" + projectId
    const body = {
      prompt,
      "user_id": userId,
      "project_name": projectName,
      "project_id": projectId,
      "env": "test"
    };
    const response = await fetch(demoProxyServerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (response.status !== 200) {
      observer.error(new Error('Failed to connect to the server'));
      return;
    }

    if (!response.body) {
      return;
    }

    // Read a stream of server-sent events
    // and feed them to the observer as they are being generated
    const reader = response.body.getReader();
    const textDecoder = new TextDecoder();
    let doneReading = false;

    while (!doneReading) {
      const { value, done } = await reader.read();
      if (done) {
        doneReading = true;
        continue;
      }

      let content = textDecoder.decode(value);
      const parsedObject = JSON.parse(content);
      // var obj = JSON.parse(content);
      if (content) {
        observer.next(parsedObject.content);
      }
    }

    observer.complete();
  }
};