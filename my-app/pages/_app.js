import "../styles/globals.css";


// internal import
import{TrackingProvider} from '../Context/Tracking';
import  Navbar  from "../Component/Navbar";
import  Footer  from "../Component/Footer";
import Profile from "../Component/Profile";


 
export default function App({ Component, pageProps }) {
  return(
    <>
    <TrackingProvider>
    <Navbar />
      <Component {...pageProps} />
    </TrackingProvider>
    <Footer />
    </>
  );
}
 
