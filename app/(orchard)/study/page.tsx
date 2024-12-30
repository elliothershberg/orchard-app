import StudyContent from "./study-content";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study - oRchard",
  description: "Study a topic",
};

export default function TopicsPage() {
  return <StudyContent />;
}
