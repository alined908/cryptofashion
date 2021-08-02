import useWeb3Modal from "./hooks/useWeb3Modal";
import Routes from './components/navigation/Routes';

function App() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

  return (
    <Routes 
      provider={provider} 
      loadWeb3Modal={loadWeb3Modal} 
      logoutOfWeb3Modal={logoutOfWeb3Modal}
    />
  );
}

export default App;
