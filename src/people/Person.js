// Imports
import React from "react";

// Component
const Person = ({ name, hairColor, eyeColor }) => {

	// Return
	return(
		<li>
			{ name }
			<ul>
				<li>Hair : { hairColor }</li>
				<li>Eyes : { eyeColor }</li>
			</ul>
		</li>
	);

};

// Export
export default Person;