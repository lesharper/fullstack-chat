import axios from "axios";

axios.defaults.withCredentials = true;

export const createDiscussion = async (e, title, poster, setModalActive) => {
  e.preventDefault();
  const data = new FormData()
  data.append("title", title)
  data.append("poster", poster)
  try {
    await axios.post("/api/create_discussion", data).then(res => {
      setModalActive(false);
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDiscussion = async setAllDiscussion => {
  try {
    await axios.get("/api/get_discussions").then(res => {
      const all_coincident = res.data.all_coincident;
      setAllDiscussion(all_coincident);
    });
  } catch (error) {
    console.log(error);
  }
};

export const searchDiscussion = async (search, setAllDiscussion) => {
  try {
    await axios.post("/api/search_discussion", { search }).then(res => {
      const all_found_coincident = res.data.all_found_coincident;
      setAllDiscussion(all_found_coincident);
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteDiscussionForUser = async (e , id) => {
  e.stopPropagation()
  try {
    await axios.post("/api/delete_discussion", { id }).then(res => {});
  } catch (error) {
    console.log(error);
  }
};

export const joinDiscussion = async (e, id) => {
  e.stopPropagation()
  try {
    await axios.post("/api/join_discussion", {id}).then(res => {})
  } catch(error) {
    console.log(error)
  }
}
