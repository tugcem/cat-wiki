import * as React from "react";
import { Select } from "baseui/select";
import {
  Card,
  StyledBody,
} from "baseui/card";
import {Heading, HeadingLevel} from 'baseui/heading';
import Image from "./Image"

export default ({onChange}) => {
  const [breeds, setBreeds] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [value, setValue] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/breeds")
      .then((res) => res.json())
      .then(({data}) => {
        const { breeds, images } = data;
        setBreeds(breeds);
        setImages(images)
      });
  }, []);

  console.log("DATA DATA", { breeds})

  function handleChange(params) {
    setValue(params.value);
    onChange(params);
  }
  
  return (
    <Card>
      <StyledBody>
          <Select
          options={breeds}
          value={value}
          placeholder="Select breed"
          onChange={handleChange}
        />
      <HeadingLevel>
        <Heading>Most Popular Cats</Heading>
      </HeadingLevel>
      </StyledBody>
      <Image images={images} />
    </Card>

  );
}