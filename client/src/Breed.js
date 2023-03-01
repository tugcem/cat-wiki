import * as React from "react";
import {
  Card,
  StyledBody,
  StyledThumbnail
} from "baseui/card";
import { Badge } from "baseui/badge";
import Image from "./Image"

export default ({breed}) => {
  const { 
    description,
    name,
    temperament, 
    origin, 
    life_span: lifeSpan, 
    adaptability, 
    affection_level: affectionLevel,
    child_friendly: childFriendly,
    grooming,
    intelligence,
    social_needs: socialNeeds,
    stranger_friendly: strangerFriendly,
    health_issues: healthIssues,
    images
  } = breed;

  let cardImage;
  if(images && images.length) {
    cardImage = images.pop().url;
  }
  

  return (
    <Card title={name}>
      <StyledThumbnail
        src={cardImage}
      />
      <StyledBody>
        <p>Description: {description}</p> 
      </StyledBody>
      <StyledBody>
        <p>Temperament: {temperament}</p> 
      </StyledBody>
      <StyledBody>
        <p>Origin: {origin}</p> 
      </StyledBody>
      <StyledBody>
        <p>Health Issues: {healthIssues} </p>
      </StyledBody>
      <StyledBody>
        <p>Social Needs: {socialNeeds} </p>
      </StyledBody>
      <StyledBody>
        <p>Stranger Friendly: {strangerFriendly} </p>
      </StyledBody>
      <Image images={images} />
    </Card>
  );
}