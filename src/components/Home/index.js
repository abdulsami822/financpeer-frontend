import {Component} from 'react'
import ReactFileReader from 'react-file-reader'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class Home extends Component {
  state = {
    errorMessage: '',
    successMessage: '',
    isLoading: false,
  }

  renderButton = () => {
    const {isLoading} = this.state
    return isLoading ? (
      <button type="button" className="upload-btn" disabled>
        <Loader type="ThreeDots" height={28} width={30} color="#fff" />
      </button>
    ) : (
      <button type="button" className="upload-btn">
        Upload Files
      </button>
    )
  }

  setError = () => {
    this.setState({
      errorMessage: 'Please Upload only json files',
      isLoading: false,
    })
  }

  submitSuccess = data => {
    const {message} = data
    this.setState({isLoading: false, successMessage: message})
  }

  submitFailed = data => {
    const errorMsg = data.error_msg
    this.setState({isLoading: false, errorMessage: errorMsg})
  }

  submitFile = async fileData => {
    this.setState({isLoading: true, errorMessage: '', successMessage: ''})
    const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    const {id} = userDetails
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://financepeer-node.herokuapp.com/post/${id}`
    const data = {
      file: JSON.stringify(JSON.parse(fileData)),
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(data),
    }
    const response = await fetch(url, options)
    const responseData = await response.json()
    if (response.ok === true) {
      this.submitSuccess(responseData)
    } else {
      this.submitFailed(responseData)
    }
  }

  handleFiles = files => {
    this.setState({errorMessage: ''})
    const reader = new FileReader()
    reader.onload = () => {
      if (files[0].type !== 'application/json') {
        this.setError()
      } else {
        this.submitFile(reader.result)
      }
    }
    reader.readAsText(files[0])
  }

  renderUpload = () => {
    const {errorMessage, successMessage} = this.state
    return (
      <div className="upload-container">
        <h1 className="upload-heading">Upload your File</h1>
        <p className="upload-paragraph">
          This file will be considered as your posts
        </p>
        <ReactFileReader handleFiles={this.handleFiles} fileTypes=".json">
          {this.renderButton()}
        </ReactFileReader>
        {errorMessage && <p className="upload-error-msg">{errorMessage}</p>}
        {successMessage && (
          <p className="upload-success-msg">{successMessage}</p>
        )}
      </div>
    )
  }

  render() {
    return (
      <div className="upload-bg">
        <Header />
        {this.renderUpload()}
        <Footer />
      </div>
    )
  }
}

export default Home
