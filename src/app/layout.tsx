import BottomNav from "@/components/base/BottomNav";
import TopNav from "@/components/base/TopNav";
import BottomCenterToast from "@/components/common/BottomCenterToast";
import AuthProvider from "@/provider/AuthProvider";
import ReactQueryProvider from "@/provider/ReactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "투게더북", template: "투게더북 | %s" },
  description:
    "독서를 하면서 발견한 마음에 드는 구절을 등록하고 생각을 정리해보세요.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <TopNav />
          <ReactQueryProvider>
            <main className="w-full flex max-w-screen-xl  mx-auto grow justify-center">
              {children}
            </main>
            <ReactQueryDevtools initialIsOpen={false} />
          </ReactQueryProvider>
          <BottomNav />
        </AuthProvider>
        <div id="portal" />
        <BottomCenterToast />
      </body>
    </html>
  );
}
