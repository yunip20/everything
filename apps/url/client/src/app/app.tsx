import { useCallback, useState } from 'react';
import axios from 'axios';
import { Text, Container } from '@chakra-ui/react';
import ShortenUrlForm from './ShortenUrlsForm';
import UrlList from './url-list';
import { Shortened } from './types';
import QrGenerator from './QrCode';

export function App() {
  const [urls, setUrls] = useState<Array<Shortened>>([]);
  const [inputUrl, setInputUrl] = useState<string>('');
  const requestShortUrl = useCallback(
    async (inputUrl: string) => {
      const response = await axios.post(`http://localhost:3333/api/shorten`, {
        original: inputUrl,
      });

      const newUrl = response.data as Shortened;

      setUrls([newUrl, ...urls]);
    },
    [urls, setUrls]
  );
  return (
    <Container maxWidth="4xl" marginBlock={10} textAlign="center">
      <Text
        bgGradient="linear(to-l, pink.500, purple.500)"
        bgClip="text"
        fontWeight="extrabold"
        fontSize="6xl"
      >
        My URL Shortener
      </Text>
      <ShortenUrlForm
        requestShortUrl={requestShortUrl}
        inputUrl={inputUrl}
        setInputUrl={setInputUrl}
      />
      <QrGenerator inputUrl={inputUrl} />
      <UrlList urls={urls} />
    </Container>
  );
}

export default App;
