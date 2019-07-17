import React, { Component } from "react"
import PropTypes from "prop-types"
import { stringify } from "core/utils"

export default class HighlightCodeRemote extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    HighlightCode: PropTypes.object,
  }
  constructor(props, context) {
    super(props, context)

    this.state = {
      value: null,
    }
  }

  componentDidMount() {
    this.loadExternalValue()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.url !== this.props.url) {
      this.loadExternalValue()
    }
  }

  loadExternalValue() {
    fetch(this.props.url)
      .then(response => response.text())
      .then(data => this.setState({ value: stringify(data) }));
  }

  render () {
    let { HighlightCode } = this.props
    let { value } = this.state

    return (
      <HighlightCode value={value ? value : 'failed to load remote example'} />
    )
  }
}
