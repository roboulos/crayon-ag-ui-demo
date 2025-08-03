import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { Message } from "@crayonai/react-core";
import { TextChunk, ResponseTemplate, ResponseTemplatePropsChunk } from "@crayonai/stream/dist/types";

export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as { messages: Message[] };
    
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    const systemPrompt = `You are a helpful assistant that creates structured responses using specific templates.

Available templates:
1. dashboard - For displaying metrics and KPIs. Response format: { "title": "string", "metrics": [{ "label": "string", "value": "string", "trend": "up" | "down" | "neutral", "change": "string" }], "lastUpdated": "string" }
2. chart - For data visualizations. Response format: { "title": "string", "type": "line" | "bar" | "pie" | "area", "data": [{ "label": "string", "value": number }], "unit": "string" }
3. action - For interactive cards. Response format: { "title": "string", "description": "string", "actions": [{ "label": "string", "type": "primary" | "secondary" | "danger", "action": "string" }] }

IMPORTANT: You must respond with a JSON object in this exact format:
{
  "template": "dashboard" | "chart" | "action",
  "data": { /* template-specific data as shown above */ }
}

Always use realistic, contextual data based on the user's request.`;

    const openAIMessages = [
      { role: "system" as const, content: systemPrompt },
      ...messages.map(msg => {
        // Extract text content from message
        let content = "";
        if (msg.role === "user" && msg.message) {
          content = msg.message;
        } else if (msg.role === "assistant" && msg.message) {
          if (typeof msg.message === "string") {
            content = msg.message;
          } else if (msg.message.type === "text") {
            content = msg.message.text;
          }
        }
        return {
          role: msg.role as "user" | "assistant",
          content: content
        };
      })
    ];
    
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: openAIMessages,
      stream: true,
      response_format: { type: "json_object" }
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          let buffer = "";
          
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || "";
            buffer += content;
          }

          // Parse the complete response
          try {
            const response = JSON.parse(buffer);
            
            // Send template event with proper SSE format
            const templateEvent = {
              type: "tpl",
              name: response.template,
              templateProps: response.data
            };
            controller.enqueue(encoder.encode(`event: tpl\ndata: ${JSON.stringify(templateEvent)}\n\n`));
            
            // Send template props chunk
            const propsChunk = {
              type: "tpl_props_chunk",
              chunk: JSON.stringify(response.data)
            };
            controller.enqueue(encoder.encode(`event: tpl_props_chunk\ndata: ${JSON.stringify(propsChunk)}\n\n`));
            
          } catch (parseError) {
            console.error("Failed to parse AI response:", parseError);
            // Send as text if parsing fails
            const textChunk = {
              type: "text",
              chunk: buffer
            };
            controller.enqueue(encoder.encode(`event: text\ndata: ${JSON.stringify(textChunk)}\n\n`));
          }
          
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          console.error("Stream error:", error);
          controller.error(error);
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}