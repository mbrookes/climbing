import "../css/tailwind.css";

import { AppProps } from "next/app";
import { useEffect } from 'react'

export default ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const jssStyles: any = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <div className="antialiased font-inter text-gray-900">
      <Component {...pageProps} />
    </div>
  )
}
