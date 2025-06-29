import os
import time
from openai import OpenAI

# Load API key from environment
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Replace with your assistant ID
ASSISTANT_ID = os.getenv("OPENAI_ASSISTANT_ID", "asst_abc123xyz456")


def run_assistant():
    """Run a simple query using the Assistant API."""
    thread = client.beta.threads.create()

    client.beta.threads.messages.create(
        thread.id,
        role="user",
        content="Explain how recursion works in JavaScript",
    )

    run = client.beta.threads.runs.create(thread.id, assistant_id=ASSISTANT_ID)

    status = run.status
    while status != "completed":
        time.sleep(1)
        status = client.beta.threads.runs.retrieve(thread.id, run.id).status

    messages = client.beta.threads.messages.list(thread.id)
    reply = next((m for m in messages.data if m.role == "assistant"), None)
    if reply:
        print("\N{SPEECH BALLOON} Assistant says:", reply.content[0].text.value)


if __name__ == "__main__":
    run_assistant()
