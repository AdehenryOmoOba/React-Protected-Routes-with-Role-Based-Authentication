import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
  faEdit,
  faTrashCan,
  faAward,
} from "@fortawesome/free-solid-svg-icons";
import "./Users.css";
import "../Modal/Modal.css";
import Modal from "../Modal/Modal";
import useAllUsers from "../../apolloServer/dataRequestHooks/GetAllUsers";
import Spinner from "../Spinner/Spinner";
import NewUserModal from "../NewUserModal/NewUserModal";
import { gql, useMutation } from "@apollo/client";
// import useDeleteUser from "../../apolloServer/dataRequestHooks/DeleteUser";

const DELETE_USER = gql`
  mutation findAndDelete($username: String) {
    deleteUser(username: $username) {
      response
    }
  }
`;

const ALERT_STYLES = {
  width: "max-content",
  backgroundColor: "#29af29",
  color: "white",
  padding: "0.5rem 2rem",
  borderRadius: "5rem",
};

function Users() {
  const [user, setUser] = useState("");
  const { loading, error, data, refetch } = useAllUsers();
  const [isOpen, setIsOpen] = useState(false);
  const [newUserOpen, setNewUserOpen] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editTelephone, setEditTelephone] = useState("");
  const [editRole, setEditRole] = useState("");
  const [deleteResponse, setDeleteResponse] = useState("");
  const [findAndDelete] = useMutation(DELETE_USER);

  const handleEdit = (e) => {
    const usernameClicked =
      e.target.parentNode.parentNode.parentNode.parentNode.getAttribute(
        "data-username"
      );

    if (!usernameClicked) return;

    const username = document.querySelector(
      `[data-username="${usernameClicked}"] .left p:nth-child(1) span:nth-child(2)`
    ).textContent;

    const telephone = document.querySelector(
      `[data-username="${usernameClicked}"] .left p:nth-child(2) span:nth-child(2)`
    ).textContent;

    const role = document.querySelector(
      `[data-username="${usernameClicked}"] .right .role-div p`
    ).textContent;

    setUser(usernameClicked);
    setEditUsername(username);
    setEditTelephone(telephone);
    setEditRole(role);
    setIsOpen(true);
  };

  const handleDelete = async (e) => {
    const usernameClicked =
      e.target.parentNode.parentNode.parentNode.parentNode.getAttribute(
        "data-username"
      );

    if (!usernameClicked) return;

    const answer = confirm(
      `Are you sure you want to delete ${usernameClicked} ?`
    );
    if (!answer) return;

    try {
      const deleteResponse = await findAndDelete({
        variables: {
          username: usernameClicked,
        },
      });

      const {
        data: {
          deleteUser: { response },
        },
      } = deleteResponse;
      refetch();
      setDeleteResponse(response);
      alert(response);
      setTimeout(() => {
        setDeleteResponse("");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateUser = () => {
    setNewUserOpen(true);
  };

  return (
    <main id="users-page">
      <div id="add-user-btn" className="flex">
        <button onClick={handleCreateUser}>Create user</button>
        <div className="flex">
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
      <div id="filter-search" className="flex">
        <div id="filter" className="flex">
          <p className="flex">Filters</p>
          <div>
            <button>Professors</button>
            <button>HODs</button>
            <button>Lecturers</button>
            <button>Students</button>
            <button>Workers</button>
          </div>
        </div>
        <div id="search" className="flex">
          <form className="flex">
            <input type="text" placeholder="Search user..." required />
            <button className="flex">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        </div>
      </div>
      {deleteResponse && <p style={ALERT_STYLES}>{deleteResponse}</p>}
      <div id="users-container" className="flex">
        {loading && <Spinner />}
        {data?.allUsers.map((user, index) => {
          return (
            <div className="user" data-username={user.username} key={index}>
              <div className="left">
                <p>
                  <span>Username </span>
                  <span className="user-info">{user.username}</span>
                </p>
                <p>
                  <span>Telephone </span>
                  <span className="user-info">{user.phone}</span>
                </p>
              </div>
              <div className="right flex">
                <div className="role-edit-delete flex">
                  <div className="role-div flex">
                    <p className="role">{user.role}</p>
                  </div>
                  <div className="edit-delete flex">
                    <div className="edit flex" onClick={handleEdit}>
                      <p>Edit</p>
                      <FontAwesomeIcon icon={faEdit} />
                    </div>
                    <div
                      className="delete flex"
                      onClick={(e) => handleDelete(e)}
                    >
                      <p>Delete</p>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        close={setIsOpen}
        user={user}
        username={editUsername}
        phone={editTelephone}
        role={editRole}
        open={isOpen}
        refreshData={refetch}
      />
      <NewUserModal
        open={newUserOpen}
        close={setNewUserOpen}
        refreshData={refetch}
      />
    </main>
  );
}

export default Users;
