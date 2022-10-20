import { useState } from 'react';
import './index.css';

const Home = () => {
    const [techStack,] = useState([
        { name: "lens protocol", path: '/img/lens.png', url: "https://lens.xyz/", id: 1 },
        { name: "metamask", path: '/img/metamask.png', url: "https://metamask.io/", id: 2 },
        { name: "wallet connect", path: '/img/walletconnect.png', url: "https://walletconnect.com/", id: 3 },
        { name: "coinbase", path: '/img/coinbase.webp', url: "https://www.coinbase.com/", id: 4 },
        { name: "ethereum", path: '/img/ethereum.png', url: "https://ethereum.org/", id: 5 },
        { name: "polygon", path: '/img/polygon.png', url: "https://polygon.technology/", id: 6 },
        { name: "worldcoin", path: '/img/worldcoin.png', url: "https://worldcoin.org/", id: 7 },
        { name: "push protocol", path: '/img/pushprotocol.png', url: "https://web.dev/push-notifications-web-push-protocol/", id: 8 },
        { name: "pokt network", path: '/img/poktnetwork.png', url: "https://www.pokt.network/", id: 9 }
    ]);
    
    return (
        <>
            <div className="container-fluid px-0">
                <div className='row mx-0 ps-5'>
                    <h1 className="home-title">
                        Meet. <span className='fw-bold'>Build.</span> Achieve.
                    </h1>
                </div>

                <div className='row mx-0'>
                    <div className="col-12 col-md-8 p-4 text-left">
                        <div className='home-card bgnd-secondary text-light shadow'>
                            Building teams for hackathons can be difficult. <span className='fw-bold'>It’s hard to find team</span> members, be able to verify their credentials, and know what they have previously built.
                        </div>
                    </div>

                    <div className="col-12 col-md-4 p-4 d-flex justify-content-center align-items-center">
                        <img src="/img/networking.png" alt="networking" width="170px" />
                    </div>
                </div>

                <div className='container p-5'>
                    <div className='p-4'>
                        <h2 className='fw-bold title'>With hackhub,</h2>
                        <h4>it becomes easy to meet other builders, connect, and grow your onchain resume.</h4>
                    </div>
                </div>

                <div className='container-fluid bgnd-primary text-center p-5'>
                    <div className='py-5'>
                        <h5 className='mb-4'>What powers hackhub?</h5>

                        <div className='row mx-0 d-flex justify-content-center'>
                            { techStack.map(tech => <div 
                                className='col-4 p-2 tech-card'
                                key={ `${ tech.id }-${ tech.name }` }>
                                <a className='d-block bg-light shadow rounded p-3 h-100 cursor-pointer' href={ tech.url }>
                                    <img src={ tech.path } alt={ tech.name } height="100%"  className='stack-img' />
                                </a>
                            </div>) }
                        </div>
                    </div>
                </div>

                <div className='container-fluid px-5 pt-5 text-center'>
                    <h3 className='p-5'>Search. <span className='fw-bold'>Connect.</span> Make it possible.</h3>
                </div>
                                
                <div className='container-fluid p-5'>
                    <div className='text-center home-card bgnd-secondary text-light'>
                        <h4>
                            Hackhub was created by a team who had a difficult time putting together a full team. Discord <span className='fw-bold'>is a difficult way</span> for people to find team members and search for individuals with specific skillsets.
                        </h4>
                    </div>
                </div>
            </div>
            
        </>
    );
}
 
export default Home;