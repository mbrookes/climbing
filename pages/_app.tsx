import "../css/tailwind.css";
import 'rc-slider/assets/index.css';


import { AppProps } from "next/app";

export default ({ Component, pageProps }: AppProps) => (

    <div className="antialiased font-inter text-gray-900">
      <Component {...pageProps} />
    </div>

);