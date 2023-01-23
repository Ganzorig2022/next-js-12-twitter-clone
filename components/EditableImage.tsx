import { DragEvent, useState } from 'react';
import { FileDrop } from 'react-file-drop';
import { PulseLoader } from 'react-spinners';

type Props = {
  src?: string;
  type: string;
  onChange: (src: string) => void;
  className?: string;
  editable?: boolean;
};

// imported from "/components/Avatar.tsx" and "/components/Cover.tsx"
const EditableImage = ({
  type,
  src,
  onChange,
  className,
  editable = false,
}: Props) => {
  const [isFileNearby, setIsFileNearby] = useState(false);
  const [isFileOver, setIsFileOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  let extraClasses = '';

  if (isFileNearby && !isFileOver) extraClasses += ' bg-blue-500 opacity-40';

  if (isFileOver) extraClasses += ' bg-blue-500 opacity-90';

  if (!editable) extraClasses = '';

  // Image chireed DRAG DROP hiihed ajillana.
  const updateImage = async (files: any, e: DragEvent<HTMLDivElement>) => {
    //preventing from updating image of replied post's avatar
    if (!editable) {
      return;
    }

    e.preventDefault();
    setIsFileNearby(false);
    setIsFileOver(false);
    setIsUploading(true);

    //1) Getting image from local
    //https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
    const data = new FormData();
    data.append(type, files[0]);

    //2) Saving to mongoDB
    fetch('/api/upload', {
      method: 'POST',
      body: data,
    }).then(async (res) => {
      //3) Getting uploaded img from back-end
      const json = await res.json();
      onChange(json.src);
      setIsUploading(false);
    });
  };

  return (
    <FileDrop
      onDrop={updateImage}
      //IMG div dotor zurag chirj oruulj irehed ajillana.
      onDragOver={() => setIsFileOver(true)}
      //IMG div dotroos zurag holdohod ajillana.
      onDragLeave={() => setIsFileOver(false)}
      //vndsen window dotor zurag chirj oruulj irehed ajillana.
      onFrameDragEnter={() => setIsFileNearby(true)}
      //vndsen window-oos zurag holdohod ajillana.
      onFrameDragLeave={() => setIsFileNearby(false)}
      //vndsen window dotor zurag chirj oruulj irehed ali aliniih ni background-uud ni oorchlogdon ajillana
      onFrameDrop={() => {
        setIsFileNearby(false);
        setIsFileOver(false);
      }}
    >
      <main className='relative bg-twitterBorder'>
        {/* Background changes when img drags */}
        <div className={`absolute inset-0 ${extraClasses}`}></div>
        {isUploading && (
          <div
            className='absolute inset-0 flex items-center justify-center'
            style={{ backgroundColor: 'rgba(48, 140, 216, 0.9)' }}
          >
            {/* Loader */}
            <PulseLoader size={14} color='#fff' />
          </div>
        )}
        {/* show uploaded img */}
        <div className={`flex items-center overflow-hidden ${className}`}>
          {src && <img src={src} alt='cover_photo' className='w-full' />}
        </div>
      </main>
    </FileDrop>
  );
};

export default EditableImage;
