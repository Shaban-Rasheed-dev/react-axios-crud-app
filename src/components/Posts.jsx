import { useEffect, useState } from "react";
import { deletepost, getapi } from "../api/ApiPost";
import { Form } from "./Form";
export const Posts = () => {
  const [data, setData] = useState([]);
  const [updatdata, setUpdatedata] = useState({});
  const getpostdata = async () => {
    const res = await getapi();
    console.log(res.data);
    setData(res.data);
  };
  useEffect(() => {
    getpostdata();
  }, []);
  const deletbtn = async (id) => {
    try {
      const res = await deletepost(id);
      if (res.status === 200) {
        const newUpdatePosts = data.filter((curPost) => {
          return curPost.id !== id;
        });
        setData(newUpdatePosts);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePostdata = (curElem) => setUpdatedata(curElem);
  console.log(updatdata);

  return (
    <>
      <section className="section-form">
        <Form
          data={data}
          setData={setData}
          updatdata={updatdata}
          setUpdatedata={setUpdatedata}
        />
      </section>
      <section className="section-post">
        <ul>
          {data.map((curElem) => {
            const { id, body, title } = curElem;
            return (
              <li key={id}>
                <p> {id}</p>
                <p>Title:{title}</p>
                <p>Body:{body}</p>
                <button className="" onClick={() => handlePostdata(curElem)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => deletbtn(id)}>
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};
