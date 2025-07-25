import { FC, useState,useRef} from "react";
import { BsLink45Deg } from "react-icons/bs";
import Button from "../Toolbar/Button"; 
import LinkForm, { linkOption } from "./LinkForm";

interface Props {
  onSubmit(link: linkOption): void;
}

const InsertLink: FC<Props> = ({ onSubmit }): JSX.Element => {
  const [visible, setVisible] = useState(false);

  const handleSubmit = (link: linkOption) => {
    if (!link.url.trim()) return hideForm();

    onSubmit(link);
    hideForm();
  };

  const hideForm = () => setVisible(false);
  const showForm = () => setVisible(true);

  
  return (
    <div
      onKeyDown={({ key }) => {
        if (key === "Escape") hideForm();
      }}
      className="relative"
    >
        {/*button link*/}
      <Button onClick={visible ? hideForm : showForm}>
        <BsLink45Deg />
      </Button>

      {/* Open Link */}
      <div className="absolute top-full mt-4 right-0 z-50">
        <LinkForm visible={visible} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default InsertLink;
