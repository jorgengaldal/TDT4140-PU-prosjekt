import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  contentMaxWidth?: string;
}

export default function Layout({ children, contentMaxWidth }: LayoutProps) {

  return (
    <div className="wrapper" aria-label="Web site content">
      <main
        className="content"
        aria-label="Principal content of the web page."
      >
        {children}
      </main>
    </div>
  );
}
