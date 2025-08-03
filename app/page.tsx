"use client";

import type { Message, ResponseTemplate } from "@crayonai/react-core";
import { CrayonChat } from "@crayonai/react-ui";
import "@crayonai/react-ui/styles/index.css";
import DashboardCard from "@/components/templates/DashboardCard";
import Chart from "@/components/templates/Chart";
import ActionCard from "@/components/templates/ActionCard";

const processMessage = async ({
  threadId,
  messages,
  abortController,
}: {
  threadId: string;
  messages: Message[];
  abortController: AbortController;
}) => {
  const response = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({ threadId, messages }),
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    signal: abortController.signal,
  });
  return response;
};

const responseTemplates: ResponseTemplate[] = [
  {
    name: "dashboard",
    Component: DashboardCard,
  },
  {
    name: "chart",
    Component: Chart,
  },
  {
    name: "action",
    Component: ActionCard,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <CrayonChat 
        processMessage={processMessage}
        responseTemplates={responseTemplates}
      />
    </div>
  );
}