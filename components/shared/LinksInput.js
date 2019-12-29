import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';

import { GenerateUuid, IsValidUrl } from '../../utilities';
import { FormInputValidationMessage } from './FormLayout';

const _ = require('lodash');

const MainGrid = styled(Grid)`
  grid-row-gap: 1rem;
`;

const Input = styled.input`
  display: block;
  width: 100%;

  &.not-first {
    margin-top: 0 !important;
  }
`;

const Button = styled.button`
  width: 100%;
  margin-top: 1.5rem;
`;

const ValidationMessage = styled(FormInputValidationMessage)``;

const LinksInput = ({
  field,
  setFieldTouched,
  setFieldValue,
  setFieldError,
  links,
}) => {
  const getInitialStateValues = passedInLinks => {
    let initialLinks;
    let initialValidity = false;
    if (!passedInLinks || !passedInLinks.length || passedInLinks.length === 0) {
      initialLinks = [
        {
          id: GenerateUuid(),
          name: '',
          url: '',
          nameTouched: false,
          nameValid: false,
          urlTouched: false,
          urlValid: false,
          valid: false,
          touched: false,
        },
      ];
    } else {
      initialLinks = passedInLinks.map(l => {
        return {
          id: l.id,
          name: l.name,
          url: l.url,
          nameTouched: false,
          nameValid: l.name,
          urlTouched: false,
          urlValid: l.url,
          valid: l.name && l.url,
          touched: false,
        };
      });
      initialValidity = initialLinks.every(link => {
        return link.valid;
      });
    }
    return { initialLinks, initialValidity };
  };

  const initialStateValues = getInitialStateValues(links);
  const [stateLinks, setStateLinks] = useState(initialStateValues.initialLinks);
  const [stateValiditiy, setStateValidity] = useState(
    initialStateValues.initialValidity,
  );

  const setValidity = l => {
    const valid = l.every(link => {
      return link.valid;
    });
    setStateValidity(valid);
  };

  const update = l => {
    setStateLinks(l);
    setValidity(l);
    setFieldTouched(field, true);
    const valid = l.every(link => {
      return link.valid;
    });
    setFieldError(field, valid ? null : 'Please fix validtion issues');
    const mapped = l.map(x => {
      return {
        name: x.name,
        url: x.url,
      };
    });
    setFieldValue(field, mapped);
  };

  const onAdd = () => {
    const l = stateLinks.concat({
      id: GenerateUuid(),
      name: '',
      url: '',
      nameTouched: false,
      urlTouched: false,
      valid: false,
      touched: false,
    });
    update(l);
  };

  const onDelete = e => {
    const l = _.remove(stateLinks, i => {
      return i.id !== e;
    });
    update(l);
  };

  const onNameBlur = index => {
    const l = stateLinks.slice();
    l[index].nameTouched = true;
    update(l);
  };

  const onUrlBlur = index => {
    const l = stateLinks.slice();
    l[index].urlTouched = true;
    update(l);
  };

  const onNameChange = (e, index) => {
    const l = stateLinks.slice();
    const i = l[index];
    i.name = e.target.value;
    i.nameTouched = true;
    i.nameValid = i.name;
    i.touched = true;
    i.valid = l[index].name && l[index].url;
    update(l);
  };

  const onUrlChange = (e, index) => {
    const l = stateLinks.slice();
    const i = l[index];
    i.url = e.target.value;
    i.urlTouched = true;
    i.urlValid = i.url && IsValidUrl(i.url);
    i.touched = true;
    i.valid = l[index].nameValid && l[index].urlValid;
    update(l);
  };

  return (
    <div id={field} name={field}>
      <MainGrid columns={36}>
        {stateLinks.map((l, index) => {
          const classNamePart1 = `${index === 0 ? 'first' : 'not-first'}`;
          const nameInvalid = l.nameTouched && !l.nameValid;
          const urlInvalid = l.urlTouched && !l.urlValid;
          return (
            <React.Fragment key={l.id}>
              <Cell width={17}>
                <Input
                  placeholder="Link text to display"
                  value={l.name}
                  onChange={e => onNameChange(e, index)}
                  onBlur={() => onNameBlur(index)}
                  className={`${classNamePart1} ${
                    nameInvalid ? 'invalid' : ''
                  }`}
                />
                <ValidationMessage>
                  {nameInvalid ? 'Required' : ''}
                </ValidationMessage>
              </Cell>
              <Cell width={17}>
                <Input
                  placeholder="Url"
                  value={l.url}
                  onBlur={() => onUrlBlur(index)}
                  onChange={e => onUrlChange(e, index)}
                  className={`${classNamePart1} ${urlInvalid ? 'invalid' : ''}`}
                />
                <ValidationMessage>
                  {urlInvalid ? 'Valid URL Required' : ''}
                </ValidationMessage>
              </Cell>
              <Cell width={2} center>
                <Button type="button" onClick={() => onDelete(l.id)}>
                  -
                </Button>
              </Cell>
            </React.Fragment>
          );
        })}
      </MainGrid>
      {stateValiditiy && (
        <button type="button" onClick={onAdd}>
          + Add
        </button>
      )}
    </div>
  );
};

export default LinksInput;
