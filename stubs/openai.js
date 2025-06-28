class OpenAI {
  constructor(opts = {}) {
    this.apiKey = opts.apiKey;
    this.beta = {
      threads: {
        create: async () => ({ id: 'thread-123' }),
        messages: {
          create: async (threadId, msg) => ({ id: 'msg-123', threadId, ...msg }),
          list: async threadId => ({
            data: [
              {
                role: 'assistant',
                content: [{ text: { value: 'Stubbed response from OpenAI.' } }]
              }
            ]
          })
        },
        runs: {
          create: async (threadId, opts) => ({ id: 'run-123', threadId, ...opts }),
          retrieve: async (threadId, runId) => ({ id: runId, status: 'completed' })
        }
      }
    };
  }
}
module.exports = { OpenAI };
