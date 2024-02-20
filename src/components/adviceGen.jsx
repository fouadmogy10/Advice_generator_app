import React, { useEffect, useState } from "react";
import mobile from "../assets/pattern-divider-mobile.svg";
import desktop from "../assets/pattern-divider-desktop.svg";
import dice from "../assets/icon-dice.svg";
import Loader from "./Loader";

const AdviceGen = () => {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [adviceNum, setAdviceNum] = useState(0);
  const [error, setError] = useState(null);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.adviceslip.com/advice`);
      const data = await res.json();
      setAdvice(data.slip.advice);
      setAdviceNum(data.slip.id);
    } catch (error) {
      setError("Failed to fetch advice");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  const handleButtonClick = () => {
    fetchAdvice();
  };

  return (
    <div className="App">
      <div className="card">
        {error ? (
          <span className="error">{error}</span>
        ) : loading ? (
          <Loader />
        ) : (
          <>
            <span className="advice-num">advice #{adviceNum}</span>
            <p className="advice-message">{advice}</p>
            <picture>
              <source media="(max-width: 37.5em)" srcSet={mobile} />
              <img src={desktop} alt="divider" className="divider" />
            </picture>
          </>
        )}
        <button className="btn" onClick={handleButtonClick}>
          <img src={dice} alt="dice" />
        </button>
      </div>
      <div className="attribution">
        <p>
          Challenge by{" "}
          <a
            className="attribution--link"
            href="https://www.frontendmentor.io?ref=challenge"
            target="_blank"
            rel="noopener noreferrer"
          >
            Frontend Mentor
          </a>
          . Coded by{" "}
          <a
            className="attribution--link"
            href="https://www.frontendmentor.io/profile/fouadmogy10"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fouad Mogy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default AdviceGen;
