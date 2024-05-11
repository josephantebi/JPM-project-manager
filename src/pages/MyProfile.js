import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ColorSelect from "../components/SelectColor";
import getColors from "../services/apiColor";
import { useQuery } from "@tanstack/react-query";
import { useLogInUser } from "../Providers/log-in-user-provider";
import PageNav from "../components/Header";
import Spinner from "../components/Spinner";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { editUser } from "../services/apiUsers";
import toast from "react-hot-toast";
import "../style.css";

function MyProfile() {
  const { currentUser, setCurrentUser } = useLogInUser();
  const [firstName, setFirstName] = useState(currentUser.first_name || "");
  const [surname, setSurname] = useState(currentUser.surname || "");
  const [nickname, setNickname] = useState(currentUser.nickname || "");
  const [selectedColor, setSelectedColor] = useState(currentUser.color || "");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    isLoading: isLoadingColors,
    data: colorsData,
    error: errorColors,
  } = useQuery({
    queryKey: ["colors"],
    queryFn: getColors,
  });

  const handleChangeColor = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleChangeFirstName = (event) => {
    let firstNameTemp = event.target.value;
    firstNameTemp =
      firstNameTemp.charAt(0).toUpperCase() +
      firstNameTemp.slice(1).toLowerCase();
    setFirstName(firstNameTemp);
  };

  const handleChangeSurname = (event) => {
    let surnameTemp = event.target.value;
    surnameTemp =
      surnameTemp.charAt(0).toUpperCase() + surnameTemp.slice(1).toLowerCase();
    setSurname(surnameTemp);
  };

  const handleChangeNickname = (event) => {
    let nicknameTemp = event.target.value;
    nicknameTemp =
      nicknameTemp.charAt(0).toUpperCase() +
      nicknameTemp.slice(1).toLowerCase();

    setNickname(nicknameTemp);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ newUser, id }) => editUser(newUser, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User edited successfully");
      navigate(`/`);
    },
    onError: (error) => {
      toast.error("Error editing user");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      first_name: firstName,
      surname: surname,
      email: currentUser.email,
      color: selectedColor,
      organization: currentUser.organization,
      created_at: currentUser.created_at,
      nickname: nickname,
    };
    const id = currentUser.id;
    setCurrentUser(newUser);
    mutate({ newUser, id });
  };

  if (isLoadingColors || isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <PageNav />
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="user-form-div">
          <p htmlFor="organizationName" className="form-label">
            Name:
          </p>
          <input
            className="organization-input"
            type="text"
            id="organizationName"
            placeholder="Enter your first name"
            value={firstName}
            onChange={handleChangeFirstName}
          />
        </div>

        <div className="user-form-div">
          <p htmlFor="organizationName" className="form-label">
            Surname:
          </p>
          <input
            className="organization-input"
            type="text"
            id="organizationName"
            placeholder="Enter your surname"
            value={surname}
            onChange={handleChangeSurname}
          />
        </div>
        <div className="user-form-div">
          <p htmlFor="organizationName" className="form-label">
            Nickname:
          </p>
          <input
            className="organization-input"
            type="text"
            id="organizationName"
            placeholder="Enter your surname"
            value={nickname}
            onChange={handleChangeNickname}
          />
        </div>
        <div className="color-select-wrapper">
          <p className="form-color">User Color:</p>
          <ColorSelect
            colors={colorsData}
            selectedColor={selectedColor}
            onChange={handleChangeColor}
          />
        </div>
        <div className="save-button-wrapper">
          <button className="save-button">Save</button>
        </div>
      </form>{" "}
    </>
  );
}

export default MyProfile;
