import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";

export const scrollToTop = (value) => window.scrollTo({ behavior: 'smooth', top: value })

export const removeItemStorage = (key) => {
    sessionStorage.removeItem(key);
}

export const setStorageValue = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
}

export const getStorageValue = (key) => {
    if (!key) return null;

    const data = sessionStorage.getItem(key);

    if (!data) return null;

    return JSON.parse(data);
}

export const firstLetterUppercase = (value) => {
    if (!value) return '';

    const str = value.toString();
    return `${str.substr(0, 1).toUpperCase()}${str.substr(1, str.length).toLowerCase()}`
}

export const dateFormat = (date) => {
    return `${new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: "medium" }).format(date)}`;
}

export const orderBy = (array, by) => {
    if (!array) return [];

    if (by === 'date')
        return array.sort((a, b) => {
            if (new Date(a.date).getTime() > new Date(b.date).getTime()) return -1;
            else if (new Date(a.date).getTime() < new Date(b.date).getTime()) return 1;

            return 0
        });
}

export const round = (value, decimals) => {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

export function getProfileImageURLFromProfileObject(profile) {
    const ipfsGateway = 'https://lens.infura-ipfs.io/ipfs/';
    const profileUrl = ipfsGateway + (profile.picture.original.url || profile.picture.small.url || '').replace('ipfs://', '');
    return profileUrl;
}

export const validateUserPicUrl = (profile) => {
    if (!profile?.picture) return '/img/unknown.png';

    if (profile?.picture.original.url.includes('ipfs://')) {
      return getProfileImageURLFromProfileObject(profile);
    }

    return profile?.picture.original.url;
}

export const sendMessage = async (subject, body, to) => {
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