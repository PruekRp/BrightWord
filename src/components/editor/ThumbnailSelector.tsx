import { FC, ChangeEventHandler, useEffect, useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import classNames from "classnames";

interface Props {
  initialValue?: string;
  onChange(mediaURL: string): void;
}

const commonClass =
  "border border-dash border-zinc-500 flex items-center justify-center rounded cursor-pointer aspect-video";

const ThumbnailSelector: FC<Props> = ({ initialValue, onChange }): JSX.Element => {
  const [selectedThumbnail, setSelectedThumbnail] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { files } = target;
    if (!files) return;

    const selectedFile = files[0];
    console.log("Files:", selectedFile);
    setFile(selectedFile);
    setSelectedThumbnail(URL.createObjectURL(selectedFile));
  };

  useEffect(() => {
    if (file) {
      const storage = getStorage();
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.error("Error uploading file:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            onChange(downloadURL);
          });
        }
      );
    }
  }, [file]);


  return (
    <div className="w-40">
      <input
        type="file"
        hidden
        accept="image/jpg, image/png, image/jpeg"
        id="thumbnail"
        onChange={handleChange}
      />
      <label htmlFor="thumbnail">
        {selectedThumbnail ? (
          <img src={selectedThumbnail} alt="" className={classNames(commonClass, "object-cover")} />
        ) : (
          <PosterUI label="Thumbnail" />
        )}
      </label>
    </div>
  );
};

const PosterUI: FC<{ label: string; className?: string }> = ({ label, className }) => {
  return <div className={classNames(commonClass, className)}><span>{label}</span></div>;
};

export default ThumbnailSelector;
