<<<<<<< HEAD
import { useRef, useState, useEffect, useCallback } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

const storedIds = JSON.parse(localStorage.getItem("preSelectedPlaces")) || [];

const storedPlaces = storedIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
);

function App() {
  const [availablePlaces, setAvailablePlace] = useState([]);
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );
      setAvailablePlace(sortedPlaces);
    });
  }, []);

  function handleStartRemovePlace(id) {
    setModelIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModelIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    const storedIds =
      JSON.parse(localStorage.getItem("preSelectedPlaces")) || [];
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem(
        "preSelectedPlaces",
        JSON.stringify([id, ...storedIds])
      );
    }
  }

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setModelIsOpen(false);

    const storedIds =
      JSON.parse(localStorage.getItem("preSelectedPlaces")) || [];

    localStorage.setItem(
      "preSelectedPlaces",
      JSON.stringify(storedIds.filter((curr) => curr !== selectedPlace.current))
    );
  }, []);

  return (
    <>
      <Modal open={modelIsOpen} onClose={handleStopRemovePlace}>
=======
import { useRef, useState, useCallback, useEffect } from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";
import { updateUserPlaces, fetchUserPlaces } from "./http.js";
import Error from "./components/ErrorPage.jsx";

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);

  const [userPlaceLoading, setUserPlaceLoading] = useState();

  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    async function fetchCurrPlace() {
      try {
        setUserPlaceLoading(true);
        const selectedPlaces = await fetchUserPlaces();
        setUserPlaces(selectedPlaces);
        setUserPlaceLoading(false);
      } catch (error) {
        setErrorUpdatingPlaces({
          message:
            error.message ||
            "Error fetching current selected places ! Please try again later",
        });
      }
    }
    fetchCurrPlace();
  }, []);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }

      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({
        message: error.message || "Failed to update places ! try again later",
      });
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );
    try {
      await updateUserPlaces(
        userPlaces.filter((place) => place.id != selectedPlace.current.id)
      );
    } catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({
        message: error.message || "Failed To Delete Places",
      });
    }

    setModalIsOpen(false);
  }, []);

  function handleErrorClose() {
    setErrorUpdatingPlaces(null);
  }

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
>>>>>>> recover-lost-work
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
<<<<<<< HEAD
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Loading Places"
          onSelectPlace={handleSelectPlace}
        />
=======
        {errorUpdatingPlaces && (
          <Error
            title={"An error has occured"}
            message={errorUpdatingPlaces.message}
          />
        )}
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
          loadingText={"Loading current selected Places"}
          isLoading={userPlaceLoading}
        />

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
>>>>>>> recover-lost-work
      </main>
    </>
  );
}

export default App;
