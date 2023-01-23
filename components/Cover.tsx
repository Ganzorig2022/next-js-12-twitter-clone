import EditableImage from './EditableImage';

type Props = {
  src: string;
  onChange: (src: string) => void;
  editable: boolean;
};

//imported from "/pages/[username].tsx"
const Cover = ({ src, editable, onChange }: Props) => {
  return (
    <EditableImage
      type={'cover'}
      src={src}
      onChange={onChange}
      editable={editable}
      className={'h-36'}
    />
  );
};

export default Cover;
