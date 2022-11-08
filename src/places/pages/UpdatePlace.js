import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import useForm from "../../shared/hooks/useForm";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators";

import "./PlaceForm.css";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire state building",
    description: "Famous sky scapper",
    imageUrl: "https://upload.wikimedia.org/wikipedia/it/thumb/6/62/Mario_Rossi_%28direttore_d%27orchestra%29.jpg/1024px-Mario_Rossi_%28direttore_d%27orchestra%29.jpg",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire state building",
    description: "Famous sky scapper",
    imageUrl: "https://upload.wikimedia.org/wikipedia/it/thumb/6/62/Mario_Rossi_%28direttore_d%27orchestra%29.jpg/1024px-Mario_Rossi_%28direttore_d%27orchestra%29.jpg",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: "u2",
  },
];
const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams().placeId;
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
    false,
  );

  const identifiedPlace = DUMMY_PLACES.find((place) => place.id === params);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true,
      );
      setIsLoading(false);
    }
  }, [setFormData, identifiedPlace]);

  if (!identifiedPlace) {
    return (
      <Card className="center">
        <h2>Could not find place!</h2>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  const updateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form action="" className="place-form" onSubmit={updateSubmitHandler}>
      <Input id="title" element="input" type="text" label="Title" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid title" onInput={inputHandler} value={formState.inputs.title.value} valid={formState.inputs.title.isValid} />
      <Input id="description" element="textarea" label="Description" validators={[VALIDATOR_MINLENGTH(5)]} errorText="Please set a valid descritption (min. 5 characters)." onInput={inputHandler} value={formState.inputs.description.value} valid={formState.inputs.description.isValid} />

      <Button type="submit" disabled={!formState.isValid}>
        Update Place
      </Button>
    </form>
  );
};

export default UpdatePlace;
