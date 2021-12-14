import React, { useState } from "react";
import "./style-discussion.css";
import Modal from "../Modal/Modal";
import DiscussionList from "../DiscussionList/DiscussionList";
import { createDiscussion } from "../../Actions/discussion";
import { useInput } from "../../Hooks/useInput";
import { searchDiscussion } from "../../Actions/discussion";

const Discussion = () => {
  const [modalActive, setModalActive] = useState(false);
  const [search, setSearch] = useState("");
  const title = useInput("", { isEmpty: true, minLength: 2, maxLength: 25 });
  const [poster, setPoster] = useState(null)
  const search_query = () => {
    if (search) searchDiscussion(search)
    setSearch("");
  };

  const create_discussion = e => {
    createDiscussion(e, title.value, poster, setModalActive);
    title.reset();
  };

  return (
    <div className="discussion">
      <form onSubmit={e => search_query(e)} className="discussion__search__block">
        <input
          type="text"
          placeholder="Поиск бесед"
          className="discussion__search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        ></input>
      </form>

      <div className="discussion__content">
        <ul className="discussion__list-container">
          <div className="discission__list-container__title">
            <span className="main__title-text">Создать беседу</span>
            <div
              class="item__title_btn-add"
              onClick={() => {
                setModalActive(true);
              }}
            ></div>
          </div>
          <hr className="hr-discussion" />
          <DiscussionList search={search} />
        </ul>
      </div>

      <Modal active={modalActive} setActive={setModalActive}>
        <form className="form__add-discussion">
          {title.isDirty && title.isEmpty && <div className="error">Поле не может быть пустым</div>}
          {title.isDirty && title.minLengthError && <div className="error">Некорректная длина</div>}
          {title.isDirty && title.maxLengthError && (
            <div className="error">Слишком длинное имя пользователя</div>
          )}
          <input
            name="titleDisc"
            type="text"
            placeholder="Название беседы"
            className="discussion__modal_input"
            value={title.value}
            onBlur={e => title.onBlur(e)}
            onChange={e => title.onChange(e)}>
          </input>
          <button
            disabled={!title.inputValid}
            className="modal__add-btn"
            onClick={e => create_discussion(e)}
          >
            Создать
          </button>
        </form>
      </Modal>
    </div>
  );
};
export default Discussion;
