import { GoogleOAuthProvider } from "@react-oauth/google";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import dynamic from "next/dynamic";
import Layout from "../components/layout/Layout";
import * as gtag from "../lib/gtag";
import { GTM_ID, pageview } from "../lib/gtm";
import { wrapper } from "../redux/store";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "../styles/globals.css";
const Schema = dynamic(
  () => {
    return import("../components/Schema");
  },
  { ssr: false }
);
const LoadingSpinner = dynamic(
  () => {
    return import("../components/layout/LoadingSpinner");
  },
  { ssr: false }
);
function MyApp({ Component, pageProps }) {
  const store = useStore((state) => state);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end, handleRouteChange, pageview);
    router.events.on("routeChangeError", end);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off(
        "routeChangeComplete",
        end,
        handleRouteChange,
        pageview
      );
      router.events.off("routeChangeError", end);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Script
        id="gtag-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `,
        }}
      />
      <Schema
        json={{
          "@context": "http://schema.org",
          "@type": "Organization",
          url: "https://www.ostello.co.in/",
          name: "Ostello",
          founder: "Rajbir Singh",
          foundingDate: "2020",
          foundingLocation: "Delhi",
          description:
            "Book your course at Ostello at the best coaching institutes in Delhi near you. | Compare and Choose from the best teachers through Demo classes | Interact with the toppers and choose what is best for you.",
          logo: "https://www.ostello.co.in/assets/images/ostello-titled-logo.svg",
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+91 8271469630",
              email: "ostelloindia@gmail.com",
              contactType: "customer service",
            },
          ],
          sameAs: [
            "https://www.facebook.com/ostellocare",
            "https://twitter.com/OstelloIndia",
            "https://www.linkedin.com/company/ostello-india/",
            "https://www.youtube.com/channel/UCO0FJ52dFGo4xS6f6NQ-qoQ",
          ],
        }}
      />

      <meta name="robots" content="index, follow" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="1 days" />
      <meta name="author" content="Ostello" />
      <main>
        <GoogleOAuthProvider
          clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
        >
          {loading ? (
            <LoadingSpinner />
          ) : process.browser ? (
            <PersistGate
              persistor={store.__persistor}
            >
              {() => (
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              )}
            </PersistGate>
          ) : (
            <PersistGate persistor={store}>
              {() => (
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              )}
            </PersistGate>
          )}
        </GoogleOAuthProvider>
      </main>
    </>
  );
}

export default wrapper.withRedux(MyApp);
