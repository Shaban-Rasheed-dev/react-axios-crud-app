/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { postData, UpdateDatta } from "../api/ApiPost";

export const Form = ({ data, setData, updatdata, setUpdatedata }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });
  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const addpostData = async () => {
    const res = await postData(addData);
    if (res.status === 201) {
      setData([...data, res.data]);
      console.log(res.data);
      setAddData({ title: "", body: "" });
    }
  };
  const updatePostData = async () => {
    try {
      const res = await UpdateDatta(updatdata.id, addData); // remove extra space in URL
      // inside api.js
      console.log(res);

      if (res.status === 200) {
        setData((prev) =>
          prev.map((curElem) =>
            curElem.id === res.data.id ? res.data : curElem
          )
        );
      }
      setAddData({ title: "", body: "" });
      setUpdatedata({});
    } catch (error) {
      console.error(error);
    }
  };

  const handleformsubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addpostData();
    } else if (action === "Edit") {
      updatePostData();
    }
    // 🔥 Validate inputs before submitting
    if (addData.title.trim() === "" || addData.body.trim() === "") {
      alert("Both title and body are required.");
      return; // stop the submit
    }
  };
  let isEmpty = Object.keys(updatdata).length === 0;
  useEffect(() => {
    updatdata &&
      setAddData({
        title: updatdata.title || "",
        body: updatdata.body || "",
      });
  }, [updatdata]);
  return (
    <>
      <form action="" onSubmit={handleformsubmit}>
        <div>
          <label htmlFor="title"></label>
          <input
            type="text"
            autoComplete="off"
            id="title"
            name="title"
            placeholder="Add Title"
            value={addData.title}
            onChange={handlechange}
          />
        </div>
        <div>
          <label htmlFor="body"></label>
          <input
            type="text"
            autoComplete="off"
            id="body"
            name="body"
            placeholder="Add Post"
            value={addData.body}
            onChange={handlechange}
          />
        </div>
        <button type="submit" value={isEmpty ? "Add" : "Edit"}>
          {isEmpty ? "Add" : "Edit"}
        </button>
      </form>
    </>
  );
};
