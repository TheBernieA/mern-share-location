import React from "react";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import useForm from "../../shared/hooks/useForm";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators";

import "./PlaceForm.css";

const NewPlace = () => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false,
  );

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); //submit this section to the BE later
  };

  return (
    <form action="" className="place-form" onSubmit={placeSubmitHandler}>
      <Input id="title" element="input" label="Title" validators={[VALIDATOR_REQUIRE()]} errorText="Please Enter a Valid Title" onInput={inputHandler} />
      <Input id="description" element="textarea" label="Description" validators={[VALIDATOR_MINLENGTH(5)]} errorText="Please Enter a valid description (at least 5 characters)." onInput={inputHandler} />
      <Input id="address" element="input" label="Address" validators={[VALIDATOR_REQUIRE()]} errorText="Please Enter a Valid Title" onInput={inputHandler} />

      <Button type="submit" disabled={!formState.isValid}>
        ADD
      </Button>
    </form>
  );
};

export default NewPlace;
