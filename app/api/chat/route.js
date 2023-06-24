import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

const API_KEY = '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'

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: API_KEY,
})
const openai = new OpenAIApi(config)

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(request) {
  // Extract the `messages` from the body of the request
  const { messages } = await request.json()

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
  })
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
  // Respond with the stream
  return new StreamingTextResponse(stream)
}