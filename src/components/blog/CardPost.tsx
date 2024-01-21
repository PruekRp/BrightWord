import Image from "next/image";
import Link from "next/link";

const CardPost = ({ key, item }:any) => {
  return (
    <div className="border-2" key={key}>
      {item.img && (
        <div>
          รูปภาพ
        </div>
      )}
      <div >
        <div >
          <span >
            {item.createdAt} 
          </span>
          
        </div>
        <Link href={`/blogs/${item.id}`}>
          <h1>{item.title}</h1>
        </Link>
        {/* <p className={styles.desc}>{item.desc.substring(0, 60)}</p> */}
        <div  dangerouslySetInnerHTML={{ __html: item?.content.substring(0,60) }}/>
        <Link href={`/blogs/${item.id}`} >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default CardPost;
