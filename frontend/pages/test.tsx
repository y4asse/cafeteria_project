import Image from 'next/image';
import {useState} from 'react';
import {postImage} from './api/upload';

export default function UploadImage() {
  const [image, setImage] = useState<File | undefined>();
  const [createObjectURL, setCreateObjectURL] = useState<string | undefined>();
  const uploadToClient = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      setImage(file);
      setCreateObjectURL(URL.createObjectURL(file));
    }
  };

  const uploadToServer = async () => {
    if (!image) return;
    const result = await postImage(image);
    console.log(result);
  };

  return (
    <div className="flex flex-1 justify-center items-center w-screen flex-col">
      <label>
        {createObjectURL && (
          <Image
            className="flex justify-center items-center"
            src={createObjectURL}
            width={200}
            height={200}
            alt="arofile-image"
          />
        )}
      </label>
      <div>
        <input
          id="file-input"
          className="hidden"
          type="file"
          accept="image/*"
          name="myImage"
          onChange={uploadToClient}
        />
      </div>
      <button
        className="btn btn-primary"
        type="submit"
        onClick={uploadToServer}
      >
        Send to server
      </button>
    </div>
  );
}
