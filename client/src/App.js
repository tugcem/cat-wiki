import * as React from "react";
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider, styled } from 'baseui';
import {Grid, Cell} from 'baseui/layout-grid';
import {Heading, HeadingLevel} from 'baseui/heading';
import {ParagraphSmall} from 'baseui/typography';

import Search from './Search';
import Breed from './Breed';
const engine = new Styletron();

const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

export default function CatWiki() {
  const [data, setData] = React.useState(undefined);

  function handleChange(e) {
    const breedId = e.option.id;
    fetch(`/api/breeds/${breedId}`)
      .then((res) => res.json())
      .then(({data}) => setData(data));
  }


  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Grid>
          <Cell span={[12]}>
            <HeadingLevel>
            <Heading>Welcome to CatWiki APP</Heading>
            <ParagraphSmall>
              Get to know more about your cat breed. 
            </ParagraphSmall>
            </HeadingLevel>
          </Cell>
          <Cell span={[1, 4, 6]}>
            <Search onChange={handleChange}/>
          </Cell>
          <Cell span={[1, 4, 6]}>
            {data && <Breed breed={data}/>}
          </Cell>
        </Grid>
      </BaseProvider>
    </StyletronProvider>
  );
}

