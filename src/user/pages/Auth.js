import React from "react";
import Input from "../../shared/components/FormElements/Input";
import useForm from "../../shared/hooks/useForm";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import { useContext, useState } from "react";

import "./Auth.css";
import { AuthContext } from "../../shared/context/auth-context";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false,
  );

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.login();
  };

  const switchtoSignUpHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid,
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false,
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };
  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <form action="" onSubmit={authSubmitHandler}>
        {!isLoginMode && <Input id="name" element="input" type="text" label="Name" validators={[VALIDATOR_REQUIRE()]} errorText="Please entere a name" placeholder="Please enter your name" onInput={inputHandler} />}
        <Input id="email" element="input" type="email" label="E-mail" validators={[VALIDATOR_EMAIL()]} errorText="Please entere a valid email" placeholder="Please enter your email" onInput={inputHandler} />
        <Input id="password" element="input" label="Password" type="password" validators={[VALIDATOR_MINLENGTH(6)]} errorText="Please entere a valid password" placeholder="Please enter a valid password" onInput={inputHandler} />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "Login" : "SignUP"}
        </Button>
      </form>
      <Button inverse onClick={switchtoSignUpHandler}>
        {isLoginMode ? "SignUp" : "Login"}
      </Button>
    </Card>
  );
};

export default Auth;
