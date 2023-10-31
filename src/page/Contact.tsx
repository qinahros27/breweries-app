import Header from './Header';
import Typography from '@mui/material/Typography';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ContactForm from '../component/contactForm';

function Contact() {
  return (
    <div>
        <Header/>
        <Typography variant="h4" component="h4" sx={{m:3,color: 'primary.main', textAlign: 'center'}}>
                Contact Us
        </Typography>
        <GoogleOAuthProvider clientId="89531482162-jio5ig8jbse4iimdd4isnjqu989ud4q6.apps.googleusercontent.com">
          <ContactForm/>
        </GoogleOAuthProvider>
    </div>
  );
}

export default Contact;