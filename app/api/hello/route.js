export async function GET(request) {
  return new Response(JSON.stringify({message: "Hello World"}), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    }
  })
}