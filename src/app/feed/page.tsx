import FeedTemplate from "@/components/feed/FeedTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "피드",
  description: "다른 사람들은 책을 읽고 어떤 생각을 했는지 알 수 있어요",
};

export const dynamic = "force-dynamic";

export default function FeedPage() {
  return <FeedTemplate />;
}
