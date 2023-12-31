import { NextIntlClientProvider } from "next-intl";

import "../../style/globals.scss";
import "../../style/reset.scss";
import s from "../../style/rootLayout.module.scss";
import type { Metadata } from "next";

import { ReduxProvider } from "@/redux/ReduxProvider";
import { notFound } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { Footer, Header } from "@/components/modules";


export const metadata: Metadata = {
  title: "CONVERTER",
  description: "it is converter",
};

const locales = ["en", "ua"];

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  let messages;
  try {
    messages = (await import(`../../../locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  if (!locales.includes(locale as any)) notFound();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ReduxProvider>

              <div className={s.wrapper}>
              <div className={s.bg}></div>
                <Header />
                <div className={s.wrapperContent}>{children}</div>
                <Toaster position="top-right" />
                <Footer />
              </div>

          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};
