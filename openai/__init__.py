class OpenAI:
    def __init__(self, api_key=None):
        self.api_key = api_key
        self.beta = self.Beta()

    class Beta:
        def __init__(self):
            self.threads = self.Threads()

        class Threads:
            def __init__(self):
                self.messages = self.Messages()
                self.runs = self.Runs()

            def create(self):
                return type('Thread', (), {'id': 'thread-123'})()

            class Messages:
                def create(self, thread_id, role=None, content=None):
                    return type('Message', (), {'id': 'msg-123', 'thread_id': thread_id, 'role': role, 'content': content})()

                def list(self, thread_id):
                    msg = type('Message', (), {
                        'role': 'assistant',
                        'content': [type('Content', (), {
                            'text': type('Text', (), {'value': 'Stubbed response from OpenAI.'})()
                        })()]
                    })
                    return type('MessagesList', (), {'data': [msg]})()

            class Runs:
                def create(self, thread_id, assistant_id=None):
                    return type('Run', (), {'id': 'run-123', 'thread_id': thread_id, 'assistant_id': assistant_id, 'status': 'completed'})()

                def retrieve(self, thread_id, run_id):
                    return type('Run', (), {'id': run_id, 'status': 'completed'})()
