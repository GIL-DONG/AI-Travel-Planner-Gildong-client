import axios from 'axios';
import { useEffect } from 'react';

export default function Test() {
  useEffect(() => {
    const testCookie = async () => {
      const data = await axios.get(
        'https://e9be-221-165-202-54.ngrok-free.app/cookie/',
        {
          headers: { 'ngrok-skip-browser-warning': '69420' },
        },
      );
      console.log(data);
    };
    testCookie();
  });
  return <div>test</div>;
}
