import axios from "axios";

axios.defaults.withCredentials = true;

export const createDiscussion = async (e, title, setModalActive) => {
  e.preventDefault();
  try {
    await axios.post("/api/create_discussion", { title }).then(res => {
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

export const deleteDiscussionForUser = async id => {
  try {
    await axios.post("/api/delete_discussion", { id }).then(res => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
};
