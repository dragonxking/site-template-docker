import Script from "next/script";

/**
 * 统计脚本：由环境变量控制，未配置则不渲染。
 *   NEXT_PUBLIC_GOOGLE_ANALYTICS_ID   GA4 衡量 ID（G-XXXXXXXXXX）
 *   NEXT_PUBLIC_MICROSOFT_CLARITY_ID  Clarity 项目 ID
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
  const clarityId = process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID;

  return (
    <>
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
          </Script>
        </>
      )}
      {clarityId && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`}
        </Script>
      )}
    </>
  );
}
