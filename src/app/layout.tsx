import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'MannMitra',
  description: 'A comprehensive digital mental health support system for Indian college students with AI chatbot, counseling booking, resource hub, peer support, and admin analytics',
};

// This layout is needed for the root page.tsx to work.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
