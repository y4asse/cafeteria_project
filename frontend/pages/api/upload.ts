import {storage} from '@/firebase/client';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';

//single image file upload
export const postImage = async (image: File) => {
  let uploadResult = '';

  if (image.name) {
    //ref(storage)を使用してFirebase Storageのルートリファレンスを取得し、それをstorageRefとして定義します。
    const storageRef = ref(storage);
    //image.name.split('.')を使って、imageのファイル名をドットで分割し、そのうちの最後の部分を拡張子extとして取得します。
    const ext = image.name.split('.').pop();
    //ランダムな文字列hashNameを生成し、extを結合して新しいファイルのフルパスをfullPathとして定義します。
    const hashName = Math.random().toString(36).slice(-8);
    const fullPath = '/images/' + hashName + '.' + ext;
    //ref(storageRef, fullPath)を使用して、アップロードするファイルの参照を取得し、それをuploadRefとして定義します。
    const uploadRef = ref(storageRef, fullPath);

    // 'file' comes from the Blob or File API
    //await uploadBytes(uploadRef, image)を使用して、uploadRefに指定された場所にimageファイルをアップロードします。この関数は非同期処理なので、awaitを使用して完了を待ちます。
    await uploadBytes(uploadRef, image).then(async function (result) {
      await getDownloadURL(uploadRef).then(function (url) {
        uploadResult = url;
      });
    });
  }
  return uploadResult;
};
