import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';

import { GenerateUuid } from '../../utilities';
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

const StringsInput = ({
  field,
  setFieldTouched,
  setFieldValue,
  setFieldError,
  strings,
}) => {
  const getInitialStateValues = passedInStrings => {
    let initialStrings;
    let initialValidity = false;
    if (
      !passedInStrings ||
      !passedInStrings.length ||
      passedInStrings.length === 0
    ) {
      initialStrings = [
        {
          id: GenerateUuid(),
          text: '',
          touched: false,
          valid: false,
        },
      ];
    } else {
      initialStrings = passedInStrings.map(s => {
        return {
          id: s.id,
          text: s.text,
          valid: s.text,
          touched: false,
        };
      });
      initialValidity = initialStrings.every(str => {
        return str.valid;
      });
    }
    return { initialStrings, initialValidity };
  };

  const initialStateValues = getInitialStateValues(strings);
  const [stateStrings, setStateStrings] = useState(
    initialStateValues.initialStrings,
  );
  const [stateValiditiy, setStateValidity] = useState(
    initialStateValues.initialValidity,
  );

  const setValidity = s => {
    const valid = s.every(str => {
      return str.valid;
    });
    setStateValidity(valid);
  };

  const update = s => {
    setStateStrings(s);
    setValidity(s);
    setFieldTouched(field, true);
    const valid = s.every(str => {
      return s.valid;
    });
    setFieldError(field, valid ? null : 'Please fix validation issues');
    const mapped = s.map(x => {
      return {
        id: x.id,
        text: x.text,
      };
    });
    setFieldValue(field, mapped);
  };

  const onAdd = () => {
    const s = stateStrings.concat({
      id: GenerateUuid(),
      text: '',
      valid: false,
      touched: false,
    });
    update(s);
  };

  const onDelete = e => {
    const s = _.remove(stateStrings, i => {
      return i.id !== e;
    });
    update(s);
  };

  const onBlur = index => {
    const s = stateStrings.slice();
    s[index].touched = true;
    update(s);
  };

  const onChange = (e, index) => {
    const s = stateStrings.slice();
    const i = s[index];
    i.text = e.target.value;
    i.touched = true;
    i.valid = s[index].text;
    update(s);
  };

  return (
    <div id={field} name={field}>
      <MainGrid columns={36}>
        {stateStrings.map((s, index) => {
          const invalid = s.touched && !s.valid;
          const className = `${index === 0 ? 'first' : 'not-first'} ${
            invalid ? 'invalid' : ''
          }`;
          return (
            <React.Fragment key={s.id}>
              <Cell width={34}>
                <Input
                  value={s.text}
                  onChange={e => onChange(e, index)}
                  onBlur={() => onBlur(index)}
                  className={className}
                />
                <ValidationMessage>
                  {invalid ? 'Required' : ''}
                </ValidationMessage>
              </Cell>
              <Cell width={2} center>
                <Button type="button" onClick={() => onDelete(s.id)}>
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

export default StringsInput;
