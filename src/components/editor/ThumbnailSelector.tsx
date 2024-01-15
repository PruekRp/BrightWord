import classNames from "classnames";
import {ChangeEventHandler, FC, useEffect, useState } from "react";

interface Props {
    initialValue?:string
    onChange(file:File) : void;
}

const commonClass =
  "border border-dash border-zinc-500 flex items-center justify-center rounded cursor-pointer aspect-video";

const ThumbnailSelector: FC<Props> = ({initialValue,onChange}): JSX.Element => {
    
    const[selectedThumbnail,setSelectedThumbnail] = useState('')

    const handleChange:ChangeEventHandler<HTMLInputElement> = ({target}) => {
        const {files} = target
        if(!files) return
        
        const file = files[0];
        console.log('Files:',file)
        setSelectedThumbnail(URL.createObjectURL((file)))
        onChange(file)
    }

    useEffect(()=>{
        if(typeof initialValue === 'string') setSelectedThumbnail(initialValue)
    },[initialValue])

  return (
    <div className=" w-40">
      <input
        type="file"
        hidden
        accept="image/jpg, image/png, image/jpeg"
        id="thumbnail"
        onChange={handleChange}
      />
      <label htmlFor="thumbnail">
           {selectedThumbnail ? (<img src={selectedThumbnail} alt='' className={classNames(commonClass,"object-cover")}/>) :  (<PosterUI label="Thumbnail" />)}
      </label>
    </div>
  );
};

const PosterUI: FC<{ label: string; className?: string }> = ({
  label,
  className,
}) => {
  return (
    <div className={classNames(commonClass, className)}>
      <span>{label}</span>
    </div>
  );
};

export default ThumbnailSelector;
