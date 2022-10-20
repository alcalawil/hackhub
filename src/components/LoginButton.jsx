import { ConnectKitButton } from 'connectkit';
import { Modal } from "react-bootstrap";
import { useState } from "react";
import toast from 'react-hot-toast';
import { FiUserCheck } from 'react-icons/fi';

import { useLazyQuery, useMutation } from '@apollo/client';
import { CHALLENGE_QUERY, AUTHENTICATE_MUTATION } from '../lib/apollo/queries';
import { getFirstProfileOwnedBy } from '../lib/apollo/apolloClient';
import { getProfileImageURLFromProfileObject, getStorageValue, setStorageValue } from '../common/utils';
import { useSignMessage, useAccount } from 'wagmi';
import { Link, useNavigate } from 'react-router-dom';

const LoginButton = () => {
    const [userLogged, setUserLogged] = useState(false);
    const [userPictureUrl, setUserPictureUrl] = useState(false);
    let navigate = useNavigate();

    const { signMessageAsync, isLoading: signLoading } = useSignMessage();
    const { address, connector } = useAccount();

    const [loadChallenge, { error: errorChallenge, loading: challengeLoading }] = useLazyQuery(CHALLENGE_QUERY, { fetchPolicy: 'no-cache' });
    const [authenticate, { error: errorAuthenticate, loading: authLoading }] =
        useMutation(AUTHENTICATE_MUTATION);

    const handleSign = async () => {
        try {
            // Get challenge
            const challenge = await loadChallenge({ variables: { address } });
            if (!challenge?.data?.challenge?.text) return toast.error('Signing error');

            // Get signature
            const signature = await signMessageAsync({ message: challenge?.data?.challenge?.text });

            // Auth user and set cookies
            const auth = await authenticate({ variables: { address, signature } });

            // save auth token
            setStorageValue('accessToken', auth.data?.authenticate.accessToken);
            setStorageValue('refreshToken', auth.data?.authenticate.refreshToken);

            const profile = await getFirstProfileOwnedBy(address);
            setUserLogged(profile);
            setStorageValue('profile', profile);
            const profilePictureUrl = getProfileImageURLFromProfileObject(profile);
            setUserPictureUrl(profilePictureUrl);
        } catch (e) {
            console.log('>>>>>>>>>>error', e);
        }
    };

    const onShowProfile = () => {
        navigate('profile', { state: {...userLogged} });
    }

    return (
        <ConnectKitButton.Custom>
            {({ isConnected, isConnecting, show, hide, address, ensName }) => {
                const handleMetamaskSignIn = () => {
                    if (!isConnected) return (
                        <button onClick={show} className="btn btn-primary rounded-pill px-3">
                            {isConnected ? address : "Connect Wallet"}
                        </button>
                    );
                    
                    return (
                        <button onClick={handleSign} className="btn btn-primary rounded-pill px-3">
                            Lens Login
                        </button>
                    );
                }

                const handleProfile = () => {
                    return (
                        <div className='d-flex justify-content-center align-items-center m-2'>
                            <img src={ userPictureUrl || '/img/user.png' } alt="myprofile" className="profile-pic rounded-circle" onClick={ onShowProfile } />
                        </div>
                    );
                }

                return (
                    !getStorageValue('accessToken')
                    ? handleMetamaskSignIn()
                    : handleProfile()
                );
            }}
        </ConnectKitButton.Custom>
    );
}

export default LoginButton;