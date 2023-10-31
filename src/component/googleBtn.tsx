import { CredentialResponse, GoogleLogin} from '@react-oauth/google';

const GoogleLoginBtn = () => {
    const successLogin = (credentialResponse: CredentialResponse) => {
    };
    const errorLogin = () => { };

    return (
        <GoogleLogin
            onSuccess={successLogin}
            onError={errorLogin}
        />
    )
}

export default GoogleLoginBtn