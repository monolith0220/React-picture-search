import React, { useState, useEffect } from "react";
import "./App.css";

export const App = () => {
	const [images, setImages] = useState([]);
	const [text, setText] = useState("");
	const [query, setQuery] = useState("cat");

	useEffect(() => {
		console.log("useEffectが走りました");
		fetch(
			`https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.REACT_APP_CLIENT_ID}`
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setImages(data.results);
			});
	}, [query]);

	const onSubmit = (e) => {
		e.preventDefault();
		setQuery(text);
		setText("");
		console.log("onSubmit");
	};

	return (
		<div className="App">
			<div className="main">
				<form onSubmit={onSubmit}>
					<input
						type="text"
						onChange={(e) => setText(e.target.value)}
						value={text}
					/>
					<button type="submit">Search</button>
				</form>
			</div>
			<div className="container">
				{images.map((image) => (
					<div key={image.id} className="card">
						<img src={image.urls.regular} className="card-img" alt="" />
						<div className="card-contet">
							<div className="card-title">{image.alt_description}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
