import { createPortal } from "react-dom";
import closeIcon from "../assets/close-svgrepo-com.svg";
import Button from "./form/Button";

type Props = {
  children: React.ReactNode;
  show: string;
  title: string;
  subTitle?: string;
  closePopup: React.Dispatch<React.SetStateAction<string>>;
};

export default function Popup({
  show,
  children,
  subTitle,
  title,
  closePopup,
}: Props) {
  return (
    show &&
    createPortal(
      <div
        className="bg-black/25 fixed top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center"
        onClick={() => closePopup("")}
      >
        <div
          className="bg-white p-8 rounded-lg space-y-5 overflow-auto max-h-[90%]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between">
            <div>
              <h2 className="text-xl font-semibold capitalize">{title}</h2>
              <h3 className="font-semibold">{subTitle}</h3>
            </div>
            <div
              className="flex items-center justify-center bg-gray-200 rounded-lg w-8 h-8 cursor-pointer"
              onClick={() => closePopup("")}
            >
              <img src={closeIcon} className="w-4" />
            </div>
          </div>
          <div>{children}</div>
          <Button
            styles="w-full"
            type="secondary"
            onClick={() => closePopup("")}
          >
            Cancel
          </Button>
        </div>
      </div>,
      document.body
    )
  );
}
