import Image from 'next/image';
import {useState} from 'react';
import {Button} from '@chakra-ui/react';
import {postImage} from './api/upload';

export default function UploadImage() {
  const [image, setImage] = useState<File | undefined>(undefined);
  const [createObjectURL, setCreateObjectURL] = useState<string | undefined>(
    undefined
  );
  const [url, setUrl] = useState<string | undefined>(undefined);
  //stateに画像を保存する
  const uploadToClient = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      setImage(file);
      setCreateObjectURL(URL.createObjectURL(file));
    }
  };

  const uploadToServer = async () => {
    if (!image) return;
    const url = await postImage(image);
    console.log(url);
    setUrl(url);
  };

  return (
    <div className="flex flex-1 justify-center items-center w-screen flex-col">
      <label>
        {createObjectURL ? (
          <Image
            className="flex justify-center items-center"
            src={createObjectURL}
            width={200}
            height={200}
            alt="arofile-image"
          />
        ) : (
          'クライアント上の画像'
        )}
      </label>
      <div>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          name="myImage"
          onChange={uploadToClient}
        />
      </div>
      <div>
        <button className="border-2 border-black p-1" onClick={uploadToServer}>
          Send to server
        </button>
      </div>
      <label>
        {url ? (
          <img
            className="flex justify-center items-center"
            src={url}
            width={200}
            height={200}
            alt="arofile-image"
          />
        ) : (
          'サーバー上の画像'
        )}
      </label>
    </div>
  );
}
