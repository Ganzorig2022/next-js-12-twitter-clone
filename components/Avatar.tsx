import EditableImage from './EditableImage';

type Props = {
  src: string;
  big: boolean;
  onChange: (src: string) => void;
  editable: boolean;
};

//imported from "/pages/[username].tsx"
const Avatar = ({ src, big, onChange, editable = false }: Props) => {
  const widthClass = big ? 'w-24' : 'w-12';

  return (
    <div className='rounded-full overflow-hidden'>
      <EditableImage
        type={'image'}
        src={src}
        onChange={onChange}
        editable={editable}
        className={`rounded-full overflow-hidden ${widthClass}`}
      />
    </div>
  );
};

export default Avatar;
