// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";

import { isNotEmpty, isEmpty } from "shared/utils";

import "./styles.scss";

type NumberInputProps = {
  text: string,
  placeholder: string,
  name?: string,
  id?: string,
  onChange: Function,
  error: null | string,
  className: string,
  onBlur: Function,
  onFocus: Function,
  autoComplete: boolean,
  disabled: boolean,
  onKeyPress?: Function,
  min: String,
  max: String,
  onKeyDown?: Function,
  step: String,
  toFixed: Number,
  isNegative: Boolean,
};

type NumberInputState = {
  stateValue: String,
  isFocused: Boolean,
};

export default class NumberInput extends PureComponent<
  NumberInputProps,
  NumberInputState
> {
  static defaultProps = {
    error: null,
    className: "",
    onChange: () => {},
    onBlur: () => {},
    onFocus: () => {},
    autoComplete: true,
    disabled: false,
    min: "0",
    max: "",
    toFixed: 2,
    isNegative: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      stateValue: this.props.text,
      isFocused: false,
    };

    // $FlowFixMe
    this.onChange = this.onChange.bind(this);
    // $FlowFixMe
    this.onBlur = this.onBlur.bind(this);
    // $FlowFixMe
    this.onFocus = this.onFocus.bind(this);
  }

  onFocus(event) {
    const { text, onFocus } = this.props;

    this.setState({
      ...this.state,
      stateValue: text,
      isFocused: true,
    });

    onFocus(event);
  }

  onChange(value) {
    const { onChange, toFixed, min, max, isNegative } = this.props;

    this.setState({
      ...this.state,
      stateValue: value,
    });

    onChange(
      isNegative
        ? isNotEmpty(max) &&
          isNotEmpty(value) &&
          parseFloat(value) <= parseFloat(max)
          ? parseFloat(
              parseFloat(value).toFixed(toFixed >= 0 ? parseFloat(toFixed) : 2)
            )
          : isEmpty(max) && isNotEmpty(value)
          ? parseFloat(
              parseFloat(value).toFixed(toFixed >= 0 ? parseFloat(toFixed) : 2)
            )
          : parseFloat(
              parseFloat(max).toFixed(toFixed >= 0 ? parseFloat(toFixed) : 2)
            )
        : isNotEmpty(value) &&
          parseFloat(value) >= parseFloat(min) &&
          isEmpty(max)
        ? parseFloat(
            parseFloat(value).toFixed(toFixed >= 0 ? parseFloat(toFixed) : 2)
          )
        : isNotEmpty(value) &&
          parseFloat(value) >= min &&
          isNotEmpty(max) &&
          parseFloat(value) <= parseFloat(max)
        ? parseFloat(
            parseFloat(value).toFixed(toFixed >= 0 ? parseFloat(toFixed) : 2)
          )
        : isNotEmpty(value) &&
          parseFloat(value) >= parseFloat(min) &&
          isNotEmpty(max) &&
          parseFloat(value) > parseFloat(max)
        ? parseFloat(
            parseFloat(max).toFixed(toFixed >= 0 ? parseFloat(toFixed) : 2)
          )
        : isNotEmpty(value) && parseFloat(value) < parseFloat(min)
        ? parseFloat(
            parseFloat(min).toFixed(toFixed >= 0 ? parseFloat(toFixed) : 2)
          )
        : isEmpty(value) && parseFloat(min)
    );
  }

  onBlur(event) {
    const { text, onBlur } = this.props;
    this.setState({
      ...this.state,
      stateValue: text,
      isFocused: false,
    });
    onBlur(event);
  }

  render() {
    const {
      text,
      placeholder,
      name,
      id,
      error,
      className,
      autoComplete,
      disabled,
      onKeyPress,
      min,
      max,
      onKeyDown,
      step,
    } = this.props;
    const { isFocused, stateValue } = this.state;

    const hasErrors = error !== null;
    return (
      <div
        className={classNames(
          "form-input",
          { "has-errors": hasErrors },
          className
        )}
      >
        <input
          autoComplete={autoComplete.toString()}
          name={name}
          id={id}
          placeholder={placeholder}
          value={
            isFocused
              ? stateValue === null
                ? ""
                : stateValue
              : text === null
              ? ""
              : text
          }
          onChange={(event) => this.onChange(event.target.value)}
          type="number"
          onBlur={(event) => this.onBlur(event)}
          onFocus={(event) => this.onFocus(event)}
          disabled={disabled}
          onKeyPress={onKeyPress}
          onKeyDown={onKeyDown}
          min={min}
          max={max}
          step={step ? step : "1"}
        />
        {getFieldErrors(error)}
      </div>
    );
  }
}

function getFieldErrors(error: string | null) {
  return error !== null && <div className="form-errors">{error}</div>;
}
