import { useState } from "react";
import Footer from "../components/Footer";
import { data_messages } from "../const";
import * as ethers from "ethers";
import * as PushAPI from "@pushprotocol/restapi"
import { getStorageValue } from '../common/utils'

const Chat = () => {
    const [looking, setLooking] = useState();
    const [message, setMessage] = useState();

    const [user,] = useState(getStorageValue('profile'));

    const sendSms = e => match_users({'Id': 0,
        'User': user.handle,
        'Message': message,
        'Looking': looking, 
        'Address': user.ownedBy },
        data_messages)
       
    return (
        <div className="container-fluid px-0">
            <div className='row mx-0 ps-5'>
                <h1 className="home-title">
                    The easiest way to <span className='fw-bold'>find a team.</span>
                </h1>
            </div>

            <div className='p-5'>
                <div className='chat-card bgnd-secondary text-light p-5 shadow'>
                    <div className="chat-bgnd d-flex flex-column align-self-end">
                        <div className="mensajes p-3 text-dark d-flex flex-column overflow-scroll">
                            { data_messages.map(msg => {
                                return (
                                    <p><span className="fw-bold">{msg.User}:</span> { msg.Message }</p>
                                )
                            }) }
                        </div>

                        <div className="d-flex input-text w-100 text-dark mb-auto">
                            <div className="w-100 text-end">
                                <input type="text" onChange={(e) => setMessage(e.target.value)} className="m-0 p-0 h-100 form-control text-right" />
                            </div>
                            <div className="d-flex flex-shrink-1">
                                <button type="button" onClick={ sendSms } className="btn btn-sm btn-primary p-2 m-0">Send</button>
                            </div>
                        </div>

                        <select id="looking" className="form-select" value={looking} 
                                onChange={(e) => setLooking(e.target.value)}>
                            <option value="Team">Team</option>
                            <option value="Join">Join</option>
                        </select>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
 
export default Chat;

class MyRegExp extends RegExp {
    [Symbol.matchAll](str) {
        const result = RegExp.prototype[Symbol.matchAll].call(this, str);
        if (!result) {
        return null;
        }
        return Array.from(result);
    }
}

function groupBy(arr, property) {
    return arr.reduce(function(memo, x) {
        if (!memo[x[property]]) { memo[x[property]] = []; }
        memo[x[property]].push(x);
        return memo;
    }, {});
}

function get_skill(messages){
var final_messages = []

for (var i = 0; i < messages.length; i++) {

    const re_frontend = new MyRegExp('front ?-?end|front|html|css|react|angular|\bui\b|ux|designer', 'igm');
    const re_backend = new MyRegExp('back ?-?end|solidity|python|node|rust|c\\+\\+|c\\#|matlab', 'igm');
    const re_fullstack = new MyRegExp('full ?-?stack', 'igm');
    const re_product = new MyRegExp('product manager|product owner|product architect|director product|product management', 'igm');
    
    const skills = {'frontend': messages[i].Message.matchAll(re_frontend).length, 
                    'backend':  messages[i].Message.matchAll(re_backend).length,
                    'fullstack':  messages[i].Message.matchAll(re_fullstack).length,
                    'product':  messages[i].Message.matchAll(re_product).length}

    var highestVal = Math.max.apply(null, Object.values(skills));

    var val = Object.keys(skills).find(function(a) {
        return skills[a] === highestVal;
    });
    
    if (highestVal === 0){
        messages[i].Skill = 'None'; 
    }
    else{
        messages[i].Skill = val; 
    }
    final_messages.push(messages[i])      
}

return final_messages; 
}

const match_users = async (matcher, messages) => {
    console.log([matcher])
    matcher = get_skill([matcher])[0]
    
    var matches = []
    var sender_subject = ''
    var to_subject = ''
    if (matcher.Looking === 'Team'){
    matches = groupBy(messages, 'Looking').Join
    sender_subject = 'There is some team finding someone with the skills you have'
    to_subject = 'There is someone that has the skills you need'
    }
    else{
    matches = groupBy(messages, 'Looking').Team
    sender_subject = 'There is someone that has the skills you need'
    to_subject = 'There is some team finding someone with the skills you have'
    }
    
    matches = get_skill(matches)


    var connections = [] 
    for (var i = 0; i < matches.length; i++) {
        if (matches[i].Skill === matcher.Skill){
            connections.push(matches[i])
            
        }
    }


    if (connections.length >= 1){

    for (var j = 0; j < connections.length; j++) {
    // User sending a message 

    sendMessage(sender_subject, `The following message was written by ${matcher.User}: ${matcher.Message}`, connections[j].Address) // 0x6edAFee0C64820b5a08899b5292BF01431A4C503
    
    // User notified
    sendMessage(to_subject, `The following message was written by ${connections[j].User}:  ${connections[j].Message}`, matcher.Address)

    // Message shown in the website 
    // sendMessage(matcher.User, matcher.Message, '0x297a6BA349Fc058233712793C290E9D6Ae2B88DD')
    }
    }
}

const sendMessage = async (subject, body, to) => {

    const PK = '8e9e3b490576f8e7a950cb9de2cbc1a832e71cde938470f54595c64c601e587e'; // channel private key
    const Pkey = `0x${PK}`;
    const signer = new ethers.Wallet(Pkey);
    // apiResponse?.status === 204, if sent successfully!
    const apiResponse = await PushAPI.payloads.sendNotification({
    signer,
    type: 3, // target
    identityType: 2, // direct payload
    notification: {
        title: subject,
        body: body
    },
    payload: {
        title: subject,
        body: body,
        cta: '',
        img: ''
    },
    recipients: `eip155:5:${to}`, // recipient address
    channel: 'eip155:5:0xc916578135a8B7c034Cb0114A6E762cd55383351', // your channel address
    env: 'staging'
    });
    return apiResponse; 
}
  
const readMessages = async (address) => {
    const notifications = await PushAPI.user.getFeeds({
    user: `eip155:5:${address}`, // user address in CAIP
    env: 'staging'
    });
    return notifications; 

}