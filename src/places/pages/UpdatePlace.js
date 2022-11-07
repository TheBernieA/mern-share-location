import { Fragment, useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import useForm from "../../shared/hooks/useForm";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";

import "./PlaceForm.css";

// const DUMMY_PLACES = [
//   {
//     id: "p1",
//     title: "Empire state building",
//     description: "Famous sky scapper",
//     imageUrl:
//       "https://upload.wikimedia.org/wikipedia/it/thumb/6/62/Mario_Rossi_%28direttore_d%27orchestra%29.jpg/1024px-Mario_Rossi_%28direttore_d%27orchestra%29.jpg",
//     address: "20 W 34th St., New York, NY 10001, United States",
//     location: {
//       lat: 40.7484405,
//       lng: -73.9856644,
//     },
//     creator: "u1",
//   },
//   {
//     id: "p2",
//     title: "Empire state building",
//     description: "Famous sky scapper",
//     imageUrl:
//       "https://upload.wikimedia.org/wikipedia/it/thumb/6/62/Mario_Rossi_%28direttore_d%27orchestra%29.jpg/1024px-Mario_Rossi_%28direttore_d%27orchestra%29.jpg",
//     address: "20 W 34th St., New York, NY 10001, United States",
//     location: {
//       lat: 40.7484405,
//       lng: -73.9856644,
//     },
//     creator: "u2",
//   },
// ];

const UpdatePlace = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();
  const params = useParams().placeId;
  const auth = useContext(AuthContext);
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  // const identifiedPlace = DUMMY_PLACES.find((place) => place.id === params);

  useEffect(() => {
    const getPlace = async () => {
      try {
        const response = await sendRequest(
          `http://localhost:3000/api/places/${params}`
        );
        setLoadedPlaces(response.place);
        setFormData(
          {
            title: {
              value: response.place.title,
              isValid: true,
            },
            description: {
              value: response.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {}
    };
    getPlace();
  }, [sendRequest, params, setFormData]);

  const updateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:3000/api/places/${params}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.push("/" + auth.userId + "/places");
    } catch (error) {}
    // console.log(formState.inputs);
    console.log(error.message);
  };
  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isLoading && !error) {
    return (
      <Card className="center">
        <h2>Could not find place!</h2>
      </Card>
    );
  }
  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlaces && (
        <form action="" className="place-form" onSubmit={updateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            onInput={inputHandler}
            value={loadedPlaces.title}
            valid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please set a valid descritption (min. 5 characters)."
            onInput={inputHandler}
            value={loadedPlaces.description}
            valid={true}
          />

          <Button type="submit" disabled={!formState.isValid}>
            Update Place
          </Button>
        </form>
      )}
    </Fragment>
  );
};

export default UpdatePlace;
