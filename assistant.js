let dotenv;
try {
  dotenv = require('dotenv');
} catch (_) {
  dotenv = require('./stubs/dotenv');
}
dotenv.config();

let OpenAI;
try {
  ({ OpenAI } = require('openai'));
} catch (_) {
  ({ OpenAI } = require('./stubs/openai'));
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const assistantId = 'asst_abc123xyz456'; // replace with your real ID

async function runAssistant() {
  const thread = await openai.beta.threads.create();

  await openai.beta.threads.messages.create(thread.id, {
    role: 'user',
    content: 'Explain how recursion works in JavaScript'
  });

  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistantId
  });

  // Wait for completion
  let runStatus;
  do {
    runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    await new Promise(r => setTimeout(r, 1000));
  } while (runStatus.status !== 'completed');

  const messages = await openai.beta.threads.messages.list(thread.id);
  const last = messages.data.find(m => m.role === 'assistant');

  console.log('\u{1F4AC} Assistant says:', last.content[0].text.value);
}

runAssistant();
