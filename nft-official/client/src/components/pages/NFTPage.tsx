import {useState, useEffect} from 'react';
import { Web3Provider } from '@ethersproject/providers';
import axios from 'axios';
import styled from 'styled-components';
import StyledLayout from '../navigation/Layout';

const NFTImage = styled.img`
  width: 100px;
  height: 100px;
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(#ffe7ea, #FFFFFF);
`

const openSeaAPI =  'https://api.opensea.io/api/v1/assets';

interface openSeaAsset {
  owner: any
  image_thumbnail_url: string
}


const NFTPage = ({provider, loadWeb3Modal, logoutOfWeb3Modal} : any) => {
    const [address, setAddress] = useState('');
    const web3Props = {provider, loadWeb3Modal, logoutOfWeb3Modal}
    const [assets, setAssets] = useState<openSeaAsset[]>();

    useEffect(() => {
        if (provider instanceof Web3Provider) {
            retrieveAddress();
        } else {
            setAddress('');
        }
    },[provider])

    useEffect(() => {
        if (address !== '') {
            callOpenSeaAPI();
        }
    },[address])

    const retrieveAddress = async () => {
        const signer = (provider as Web3Provider).getSigner();
        const address = await signer.getAddress();
        setAddress(address);
    }

    const callOpenSeaAPI = async () => {
        try {
            const response = await axios.get(
            openSeaAPI,
            {
                params: {
                owner: address
                }
            }
            )
            console.log(response.data.assets);
            setAssets(response.data.assets);
        } catch(e) {
            console.log(e);
        }
    }


    return (
        <StyledLayout {...web3Props}>
            <Main>
                {address}
                {assets?.map(asset => 
                    <NFTImage src={asset.image_thumbnail_url}/>
                )}
            </Main>
        </StyledLayout>
    )
}

export default NFTPage