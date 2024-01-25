import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Calculator from "../src/tools/calculator";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      isMicrophoneClicked: false,
    };
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.silenceTimeout = null;
    this.silenceThreshold = 50; // Adjust this threshold as needed (in dB)
  }

  handleSearchChange = (event) => {
    const searchQuery = event.target.value.trim();
    this.setState({ searchQuery });
  };

  handleSearch = () => {
    const { searchQuery } = this.state;
    Axios.post("http://localhost:8000/api/search/", { search_query: searchQuery })
      .then((response) => {
        const jsContent = response.data;
  
        // Check if the search query is "calculator"
        if (searchQuery.toLowerCase() === "calculator") {
          // Set a flag in the state to indicate that the calculator should be displayed
          this.setState({ showCalculator: true });
        } else {
          // Do something else if the search query is not "calculator"
          console.log("Search result:", jsContent);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  
  

  handleMicrophoneClick = () => {
    if (this.state.isMicrophoneClicked) {
      this.stopRecording();
    }
    this.setState((prevState) => ({
      isMicrophoneClicked: !prevState.isMicrophoneClicked,
    }));
  
    if (!this.state.isMicrophoneClicked) {
      this.startRecording();
    }
  };

  startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];
      this.silenceTimeout = null;

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        this.sendAudioToBackend(audioBlob);
        this.audioChunks = [];
        this.mediaRecorder = null;
        this.silenceTimeout = null;
      };

      this.mediaRecorder.start();

      this.mediaRecorder.stream.getAudioTracks()[0].addEventListener('ended', () => {
        this.stopRecording();
      });

      const audioContext = new AudioContext();
      const audioSource = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      audioSource.connect(analyser);
      analyser.fftSize = 256;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const checkSilence = () => {
        analyser.getByteFrequencyData(dataArray);
        const audioLevel = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
        if (audioLevel < this.silenceThreshold) {
          if (!this.silenceTimeout) {
            this.silenceTimeout = setTimeout(() => {
              this.stopRecording();
            }, 5000);
          }
        } else {
          clearTimeout(this.silenceTimeout);
          this.silenceTimeout = null;
        }
      };

      setInterval(checkSilence, 100);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  stopRecording = () => {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
    }
    if (this.silenceTimeout) {
      clearTimeout(this.silenceTimeout);
      this.silenceTimeout = null;
      this.setState({ isMicrophoneClicked: false });
    }
  };

  sendAudioToBackend = async (audioBlob) => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, "audio.webm");

      const response = await Axios.post("http://localhost:8000/api/audio_transcription/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        const transcribedText = response.data.transcription;
        this.setState({ searchQuery: transcribedText });
      } else {
        console.error('Server returned an unexpected status:', response.status);
      }
    } catch (error) {
      console.error('Error sending audio to backend:', error);
    }
  };

  render() {
    const { isMicrophoneClicked, showCalculator } = this.state;
    const microphoneButtonClass = `btn-microphone ${isMicrophoneClicked ? 'pulsing' : ''}`;
    const placeholderText = isMicrophoneClicked ? "Listening..." : "Enter your search query";
  
    return (
      <div className="container d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h1 className="mb-4">Search Engine Demo</h1>
          <div className="input-group mb-3">
            <div style={{ position: "relative", width: '500px' }}> {/* Adjust the width value */}
              <input
                type="text"
                className="form-control"
                placeholder={placeholderText}
                value={this.state.searchQuery}
                onChange={this.handleSearchChange}
              />
              <button
                className={microphoneButtonClass}
                type="button"
                onClick={this.handleMicrophoneClick}
                style={{
                  position: "absolute",
                  top: 1,
                  right: 5,
                  bottom: 0,
                }}
              >
                <FontAwesomeIcon icon={faMicrophone} style={{ color: "black" }} />
              </button>
            </div>
            <div className="input-group-append">
              <button
                className="btn btn-primary ml-2"
                type="button"
                onClick={this.handleSearch}
              >
                Search
              </button>
            </div>
          </div>
          {showCalculator && (
          <>
            <div style={{ border: '.5px solid grey', padding: '0px', marginTop: "55px" , width: '100%' }}></div>
            <Calculator />
          </>
        )}
        </div>
      </div>
    );
  }
  
}
  
export default App;